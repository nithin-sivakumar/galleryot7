import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

async function createUser(req, res) {
  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.send(
        new ApiResponse(
          400,
          null,
          "Username or email already exists. Kindly login with your credentials."
        )
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      email,
      fullName: name,
      password: hashed,
    });

    const accessToken = createdUser.generateAccessToken();
    const refreshToken = createdUser.generateRefreshToken();
    createdUser.refreshToken = refreshToken;
    await createdUser.save();

    res.cookie("at", accessToken);
    res.cookie("rt", refreshToken);

    res.send(
      new ApiResponse(
        201,
        { user: createdUser, accessToken, refreshToken },
        "User created successfully."
      )
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error creating user."));
  }
}

export { createUser };
