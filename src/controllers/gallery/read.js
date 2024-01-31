import { ApiResponse } from "../../utils/ApiResponse.js";
import { Gallery } from "../../models/gallery.model.js";
import { User } from "../../models/user.model.js";

const getMyImages = async (req, res) => {
  try {
    const exists = await User.findById(req.params.id);

    if (!exists) {
      return res
        .status(404)
        .send(new ApiResponse(404, [], "User with the provided ID not found."));
    }

    const images = await Gallery.find({ submittedBy: req.params.id }).select(
      "img title"
    );

    res
      .status(200)
      .send(new ApiResponse(200, images, "Images fetched successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error retrieving images."));
  }
};

export { getMyImages };
