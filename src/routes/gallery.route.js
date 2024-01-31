import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadImage } from "../controllers/gallery/create.js";
import { getMyImages } from "../controllers/gallery/read.js";
import { deleteImage } from "../controllers/gallery/delete.js";
const router = express.Router();

router.route("/").post(upload.array("files"), uploadImage);
router.route("/:id").get(getMyImages);
router.route("/r/:id").delete(deleteImage);

export default router;
