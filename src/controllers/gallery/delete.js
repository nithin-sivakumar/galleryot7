import cloudinary from "cloudinary";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Gallery } from "../../models/gallery.model.js";

const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);

    if (!image) {
      return res
        .status(404)
        .send(
          new ApiResponse(404, [], "Image with the provided ID not found.")
        );
    }

    const cloudinaryPublicId = image.cloudinaryPublicId;
    cloudinary.v2.uploader.destroy(
      cloudinaryPublicId,
      async (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
          return res
            .status(500)
            .send(new ApiResponse(500, error, "Error deleting image."));
        }

        const deleted = await Gallery.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .send(new ApiResponse(200, deleted, "Image deleted successfully."));
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(new ApiResponse(500, error, "Error deleting image."));
  }
};

export { deleteImage };
