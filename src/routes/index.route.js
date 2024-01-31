import express from "express";
const router = express.Router();
import userRouter from "./user.route.js";
import galleryRouter from "./gallery.route.js";

router.use("/api/v1/user", userRouter);
router.use("/api/v1/gallery", galleryRouter);

router.use("/api/public", express.static("./public"));

export default router;
