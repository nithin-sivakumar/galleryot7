import { ApiResponse } from "../../utils/ApiResponse.js";
import { config, sendMail } from "@nithin-sivakumar/mail-sender";
import { OTP as OTPModel } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";

function generateOTP() {
  let otp = "";
  const digits = "0123456789";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

const generatedOTPs = new Set();

function generateUniqueOTP() {
  let otp = generateOTP();

  while (generatedOTPs.has(otp)) {
    otp = generateOTP();
  }

  generatedOTPs.add(otp);

  if (generatedOTPs.size > 1000000) {
    generatedOTPs.clear();
  }

  return otp;
}

async function sendResetOTP(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(404)
        .send(new ApiResponse(404, [], "Required fields missing."));
    }

    const exists = await User.findOne({ email });

    if (!exists) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            [],
            "User with the provided email does not exist. Kindly create an account first."
          )
        );
    }

    const code = generateUniqueOTP();

    const body = `
        <p>Dear User,</p>
        <p>You have requested to reset your password. Please use the following OTP (One-Time Password) to proceed with the password reset process:</p>
        <p><strong>OTP:</strong> ${code}</p>
        <p>Please note that this OTP is valid for 10 minutes. If you did not request this password reset, you can safely ignore this email.</p>
        <p>Thank you,</p>
        <p>Blogify</p>
    `;
    config(process.env.GOOGLE_APP_EMAIL, process.env.GOOGLE_APP_PASSWORD);

    sendMail(email, "[no-reply] Reset your password", body);

    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 10);

    const existingOTP = await OTPModel.findOne({ email });

    if (existingOTP) {
      existingOTP.otp = code;
      existingOTP.expiry = expiryTime;
      await existingOTP.save();

      return res
        .status(200)
        .send(
          new ApiResponse(
            200,
            code,
            "We have sent a new OTP to your email successfully."
          )
        );
    } else {
      await OTPModel.create({
        email,
        otp: code,
        expiry: expiryTime,
      });
    }

    res
      .status(200)
      .send(new ApiResponse(200, code, "OTP sent via email successfully."));
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error sending reset link."));
  }
}

export { sendResetOTP };
