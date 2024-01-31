import { ApiResponse } from "../../utils/ApiResponse.js";

async function logoutUser(req, res) {
  try {
    res.clearCookie("at");
    res.clearCookie("rt");

    res.send(new ApiResponse(200, null, "Logged out successfully."));
  } catch (error) {
    console.error(error);
    res.status(500).send(new ApiResponse(500, [], "Error logging out user."));
  }
}

export { logoutUser };
