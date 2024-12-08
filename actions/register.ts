"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { getUserByEmail, getUserByGovId } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmailRegister } from "../src/lib/mail";
import { auth } from "../auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const session = await auth();
  const sesRole = session?.user.role;

  // Check if the user has permission to register
  if (sesRole === "user") {
    return { error: "You can't register, only higher-ups can." };
  }

  // Validate input fields
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields provided." };
  }

  const { email, password, name, number, role, govId, location } =
    validatedFields.data;

  // Normalize the role to lowercase
  const normalizedRole = role.toLowerCase();

  // Check for invalid role
  const validRoles = ["admin", "user", "incharge"];
  if (!validRoles.includes(normalizedRole)) {
    return { error: "Role should be either 'admin', 'user', or 'incharge'." };
  }

  // Prevent incharge from registering as incharge
  if (sesRole === "incharge" && normalizedRole === "incharge") {
    return { error: "You can't register an incharge as incharge." };
  }

  // Check if email or government ID already exists
  const [existingUser, existingUserGov] = await Promise.all([
    getUserByEmail(email),
    getUserByGovId(govId),
  ]);

  if (existingUser) {
    return { error: "Email already exists." };
  }
  if (existingUserGov) {
    return { error: "Government ID already exists." };
  }

  // Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      phone: number,
      role: normalizedRole, // Use normalized role
      govId,
      location,
    },
  });

  // Generate a verification token and send verification email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmailRegister(
    email,
    verificationToken.token,
    name,
    password,
    govId,
    location,
  );

  return { success: "Confirmation email sent!" };
};
