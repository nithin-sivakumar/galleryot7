import { ApiResponse } from "../../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

async function getDetails(req, res) {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            [],
            "Authorization header is missing or incorrectly formatted."
          )
        );
    }

    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!verified) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            [],
            "Token verification failed. Please check your token or login again."
          )
        );
    }

    return res.send(
      new ApiResponse(200, verified, "Token authentication successful.")
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send(new ApiResponse(500, [], "Error retrieving user details."));
  }
}

export { getDetails };
