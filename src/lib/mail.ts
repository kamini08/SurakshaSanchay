import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
// const domain = process.env.NEXT_PUBLIC_APP_URL;
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "mail@khetideals.shop",
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000?token=${token}`;

  await resend.emails.send({
    from: "mail@khetideals.shop",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
  });
};
export const sendVerificationEmailRegister = async (
  email: string,
  token: string,
  name: string,
  password: string,
  govId: string,
  location: string,
) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "mail@khetideals.shop",
    to: email,
    subject: "Confirm your email",
    html: `<div>
    <p>Dear ${name},</p>
    <p>Welcome to the department! We are honored to have you join the team. Below are your initial details:</p>
    <ul>
        <li><strong>Employee ID:</strong> ${govId}</li>
        <li><strong>Assigned Location:</strong> ${location}</li>
    </ul>
    <p>Your temporary password is: <strong>${password}</strong></p>
    <p>For security purposes, please confirm your email address and set up your credentials by clicking the link below:</p>
    <p><a href="${confirmLink}" style="color: #0056b3; text-decoration: none; font-weight: bold;">Confirm Email and Login</a></p>
    <br />
    <p>Should you have any questions or require assistance, please contact your supervisor or the IT department.</p>
    <p>We look forward to your valuable contributions.</p>
    <p>Best regards,</p>
    <p>[SurakshaSanchay 👮]</p>
</div>
`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "mail@khetideals.shop",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password</p>`,
  });
};

export const sendingEmail = async (email: string, message: string) => {
  await resend.emails.send({
    from: "mail@khetideals.shop",
    to: email,
    subject: "inventory update",
    html: `<p>${message}</p>`,
  });
};
