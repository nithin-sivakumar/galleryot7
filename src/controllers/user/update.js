import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import bcrypt from "bcryptjs";

async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, null, "User with the provided ID was not found.")
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullName: name,
        email,
        password: hashed,
      },
      { new: true }
    );

    res.send(new ApiResponse(200, updated, "User updated successfully"));
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error updating user."));
  }
}

export { updateUser };
