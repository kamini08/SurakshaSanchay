import cron from "node-cron";
import fetch from "node-fetch";

// Schedule a task to run daily at 8:00 AM
cron.schedule("0 8 * * *", async () => {    //automatically calls it everyday at 8am
  console.log("Running scheduled notification check...");

  try {
    const response = await fetch("http://localhost:3000/api/notifications/automatic");
    if (response.ok) {  
      console.log("Notifications processed successfully.");
    } else {
      console.error("Failed to process notifications:", await response.text());
    }
  } catch (error) {
    console.error("Error running scheduled notifications:", error);
  }
});

console.log("Cron job scheduled. Server is running.");
