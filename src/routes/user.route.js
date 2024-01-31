import express from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user/index.js";
import { loginUser } from "../controllers/user/login.js";
import { logoutUser } from "../controllers/user/logout.js";
import { getDetails } from "../controllers/user/getDetails.js";
import { sendResetOTP } from "../controllers/user/sendMail.js";
import { resetPassword } from "../controllers/user/resetPassword.js";
const router = express.Router();

router.route("/all").get(getUsers);
router.route("/u/:id").get(getOneUser);
router.route("/new").post(createUser);
router.route("/e/:id").put(updateUser);
router.route("/r/:id").delete(deleteUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/info").get(getDetails);
router.route("/forgot").post(sendResetOTP);
router.route("/reset").post(resetPassword);

export default router;
