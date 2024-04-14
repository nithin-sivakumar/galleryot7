import { ApiResponse } from "../../utils/ApiResponse.js";
import { Gallery } from "../../models/gallery.model.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadImage = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "No files uploaded."));
    }

    // Iterate through each file and upload to Cloudinary and create database record
    for (const file of files) {
      const localFilePath = file.path;

      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: "auto",
        folder: "galleryot7",
      });

      const created = await Gallery.create({
        img: response.secure_url,
        title: response.original_filename,
        submittedBy: req.body.submittedBy,
        cloudinaryPublicId: response.public_id,
      });

      // Delete the file from the local system after uploading to Cloudinary
      fs.unlink(localFilePath, (err) => {
        if (err) console.log(err);
      });
    }

    res
      .status(201)
      .send(new ApiResponse(201, null, "Images uploaded successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error uploading images."));
  }
};

export { uploadImage };
