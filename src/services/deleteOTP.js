import cron from "node-cron";
import { OTP } from "../models/otp.model.js";

cron.schedule("* * * * *", async () => {
  try {
    await OTP.deleteMany({ expiry: { $lt: new Date() } });
    // console.log("Expired OTP entries deleted successfully");
  } catch (error) {
    console.error("Error deleting expired OTP entries:", error);
  }
});
