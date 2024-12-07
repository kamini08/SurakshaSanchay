// src/app/api/notifications/route.js

import { Resend } from "resend";
    import { db } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await resend.emails.send({
      from: "Your Project <no-reply@yourdomain.com>",
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const checkInventoryConditions = async () => {
  // Fetch items matching conditions from the database
  const items = await db.inventoryItem.findMany({
    where: {
      OR: [
        { condition: "damaged" },
        { isLost: true },
        { expiryDate: { lte: new Date() } },
        {
          AND: [
            { maintenanceSchedule: { not: null } },
            {
              maintenanceSchedule: {
                lte: new Date().toISOString().split("T")[0], // Maintenance due today or earlier
              },
            },
          ],
        },
        {
          AND: [
            { lastInspectionDate: { not: null } },
            {
              lastInspectionDate: {
                lte: new Date(new Date().setMonth(new Date().getMonth() - 6)), // Older than 6 months
              },
            },
          ],
        },
      ],
    },
  });

  for (const item of items) {
    let emailSubject = "";
    let emailBody = "";

    if (item.condition === "damaged") {
      emailSubject = `Alert: Damaged Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} is marked as damaged. Please take necessary action.`;
    } else if (item.isLost) {
      emailSubject = `Alert: Lost Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} is reported as lost. Please investigate.`;
    } else if (item.expiryDate && new Date(item.expiryDate) <= new Date()) {
      emailSubject = `Alert: Expired Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} has expired on ${item.expiryDate}. Please replace it.`;
    } else if (item.maintenanceSchedule && new Date(item.maintenanceSchedule) <= new Date()) {
      emailSubject = `Alert: Maintenance Due for Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} is due for maintenance on ${item.maintenanceSchedule}. Please schedule the maintenance immediately.`;
    } else if (
      item.lastInspectionDate &&
      new Date(item.lastInspectionDate) <= new Date(new Date().setMonth(new Date().getMonth() - 6))
    ) {
      emailSubject = `Alert: Inspection Overdue for Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} has not been inspected in over 6 months. Please conduct an inspection as soon as possible.`;
    }

    // Send the email
    await sendEmail("admin@yourdomain.com", emailSubject, emailBody);
  }
};

export async function GET(req:Request) {
  try {
    await checkInventoryConditions();
    return new Response("Emails processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing notifications:", error);
    return new Response("Error processing notifications", { status: 500 });
  }
}
