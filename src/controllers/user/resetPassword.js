import { ApiResponse } from "../../utils/ApiResponse.js";
import { OTP as OTPModel } from "../../models/otp.model.js";
import { User } from "../../models/user.model.js";
import bcrypt from "bcryptjs";

async function resetPassword(req, res) {
  try {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, [], "Required fields missing."));
    }

    const exists = await OTPModel.findOne({ email });

    if (!exists) {
      return res
        .status(404)
        .send(new ApiResponse(404, [], "Invalid credentials."));
    }

    if (otp === exists.otp) {
      const currentUser = await User.findOne({ email });

      if (!currentUser) {
        return res
          .status(404)
          .send(
            new ApiResponse(
              404,
              [],
              "User with the provided email does not exist."
            )
          );
      }

      const hashed = await bcrypt.hash(password, 10);
      currentUser.password = hashed;
      await currentUser.save();
    } else {
      return res
        .status(400)
        .send(new ApiResponse(400, [], "Invalid credentials."));
    }

    const deleteExisting = await OTPModel.findOne({ email });

    if (deleteExisting) {
      await OTPModel.findOneAndDelete({ email });
    }

    res
      .status(200)
      .send(
        new ApiResponse(200, [], "Your password has been reset successfully.")
      );
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error sending reset link."));
  }
}

export { resetPassword };
