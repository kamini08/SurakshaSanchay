import { Resend } from "resend";
import { db } from "../db";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await resend.emails.send({
      from: "mail@khetideals.shop",
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

/**
 * Checks inventory conditions and sends notifications if needed.
 */
export default async function checkInventoryConditions() {
  const currentDate = new Date();

  // Fetch items matching conditions from the database
  const items = await db.inventoryItem.findMany({
    where: {
      OR: [
        { condition: "damaged" },
        { isLost: true },
        { expiryDate: { lte: currentDate } },
        {
          maintenanceSchedule: { not: null },
          lastInspectionDate: { not: null },
        },
        {
          AND: [
            { lastInspectionDate: { not: null } },
            {
              lastInspectionDate: {
                lte: new Date(currentDate.setMonth(currentDate.getMonth() - 6)),
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
    } else if (item.expiryDate && new Date(item.expiryDate) <= currentDate) {
      emailSubject = `Alert: Expired Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} has expired on ${item.expiryDate}. Please replace it.`;
    } else if (item.maintenanceSchedule) {
      const lastMaintenanceDate = item.lastInspectionDate ? new Date(item.lastInspectionDate) : null;      let nextMaintenanceDate;
      if(lastMaintenanceDate){
      if (item.maintenanceSchedule === "monthly") {
        nextMaintenanceDate = new Date(lastMaintenanceDate.setMonth(lastMaintenanceDate.getMonth() + 1));
      } else if (item.maintenanceSchedule === "half-yearly") {
        nextMaintenanceDate = new Date(lastMaintenanceDate.setMonth(lastMaintenanceDate.getMonth() + 6));
      } else if (item.maintenanceSchedule === "yearly") {
        nextMaintenanceDate = new Date(lastMaintenanceDate.setFullYear(lastMaintenanceDate.getFullYear() + 1));
      }
    }
      if (nextMaintenanceDate && nextMaintenanceDate <= currentDate) {
        emailSubject = `Alert: Maintenance Due for Item - ${item.itemId}`;
        emailBody = `The item ${item.itemId} in category ${item.category} is due for maintenance. Please schedule the maintenance immediately.`;
      }
    } else if (
      item.lastInspectionDate &&
      new Date(item.lastInspectionDate) <= new Date(currentDate.setMonth(currentDate.getMonth() - 6))
    ) {
      emailSubject = `Alert: Inspection Overdue for Item - ${item.itemId}`;
      emailBody = `The item ${item.itemId} in category ${item.category} has not been inspected in over 6 months. Please conduct an inspection as soon as possible.`;
    }

    if (emailSubject && item.userId) {
      const user = await db.user.findFirst({
        where: { govId: item.userId },
      });

      if (user?.email) {
        // Send the email
        await sendEmail(user.email, emailSubject, emailBody);
      } else {
        console.error(`User with govId ${item.userId} not found or email is missing.`);
      }
    } else {
      console.error(`Item userId is null, unable to fetch user.`);
    }
  }
}
