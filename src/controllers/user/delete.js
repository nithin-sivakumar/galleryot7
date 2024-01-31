import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

async function deleteUser(req, res) {
  try {
    const existingUser = await User.findById(req.params.id);

    if (!existingUser) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided username was not found."
          )
        );
    }

    if (existingUser.deleted) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "This account has been deleted recently. If you are the owner of this account, and if you feel that there has been a mistake, contact our support team."
          )
        );
    }

    existingUser.deleted = true;

    await existingUser.save();

    res.send(new ApiResponse(200, existingUser, "User deleted successfully."));
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error deleting user."));
  }
}

export { deleteUser };
