import mongoose, { Schema } from "mongoose";

const gallerySchema = new Schema(
  {
    img: {
      type: String,
      required: [true, "Please enter the img url"],
    },
    title: {
      type: String,
      required: [true, "Please enter the img title"],
    },
    submittedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Please enter the user ID"],
    },
    cloudinaryPublicId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Gallery = mongoose.model("Gallery", gallerySchema);
