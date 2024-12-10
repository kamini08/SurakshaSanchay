"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas";
import { db } from "@/lib/db";
import { signIn } from "../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { AuthError } from "next-auth";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { getUserByEmail } from "../data/user";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "../src/lib/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
const {RecaptchaEnterpriseServiceClient} = require('@google-cloud/recaptcha-enterprise');

export const login = async (values: any) => {
  const validatedFields = LoginSchema.safeParse(values);
  const { recaptcha_token, ...value } = values;
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }


  if (!recaptcha_token) {
    return { error: "reCAPTCHA token not found! Try again" };
  }

  async function createAssessment({
    projectID = process.env.RECAPTCHA_PROJECT,
    recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    token = recaptcha_token,
    recaptchaAction = "LOGIN",
  }) {

    // Create the reCAPTCHA client.
    // TODO: Cache the client generation code (recommended) or call client.close() before exiting the method.
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);
  
    // Build the assessment request.
    const request = ({
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
        },
      },
      parent: projectPath,
    });
  
    const [ response ] = await client.createAssessment(request);
  
    // Check if the token is valid.
    if (!response.tokenProperties.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties.invalidReason}`);
      return null;
    }
  
    
    if (response.tokenProperties.action === recaptchaAction) {
      // Get the risk score and the reason(s).
      // For more information on interpreting the assessment, see:
      // https://cloud.google.com/recaptcha-enterprise/docs/interpret-assessment
      console.log(`The reCAPTCHA score is: ${response.riskAnalysis.score}`);
      response.riskAnalysis.reasons.forEach((reason: any) => {
        console.log(reason);
      });

      console.log(response.riskAnalysis.score);
  if (response.riskAnalysis.score < 0.7) {
    return { error: response["error-codes"] };
  }
  
      return response.riskAnalysis.score;
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return null;
    }
  }
  
 

  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  

  

  const { govId, email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  if (govId !== existingUser.govId) {
    return { error: "Government Id does not match!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = generateVerificationToken(existingUser.email);

    await sendVerificationEmail(
      (
        await verificationToken
      ).email,
      (
        await verificationToken
      ).token
    );
    return { success: "Confirmation email sent" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) {
        return { error: "Invalid  code" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }

      // Delete two factor token for new sign in
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        (
          await twoFactorToken
        ).email,
        (
          await twoFactorToken
        ).token
      );
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      govId,
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials " };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
