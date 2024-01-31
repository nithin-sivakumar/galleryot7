import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

async function getUsers(req, res) {
  try {
    const allUsers = await User.find({ deleted: { $ne: true } });
    if (allUsers.length === 0) {
      return res
        .status(200)
        .send(new ApiResponse(200, [], "No users available on the database."));
    }
    res.send(new ApiResponse(200, allUsers, "Users fetched successfully."));
  } catch (error) {
    res.status(500).send(new ApiResponse(500, [], "Error reading users."));
  }
}

async function getOneUser(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided ID does not exist."
          )
        );
    }

    if (user.deleted) {
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

    res.send(new ApiResponse(200, user, "User fetched successfully."));
  } catch (error) {
    res
      .status(500)
      .send(new ApiResponse(500, [], "Error getting user details."));
  }
}

export { getUsers, getOneUser };
