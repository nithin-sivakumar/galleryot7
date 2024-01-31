import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    if (user && isPasswordValid) {
      res.cookie("at", accessToken);
      res.cookie("rt", refreshToken);
    }

    res.send(
      new ApiResponse(200, { accessToken, refreshToken }, "Login successful")
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error logging in."));
  }
}

export { loginUser };
