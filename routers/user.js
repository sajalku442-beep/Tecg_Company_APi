import express from "express";
import {
  deleteUserById,
  getallusers,
  getUserData,
  login,
  register,
  updateUserData,
} from "../controllers/user.js";
import { authenticate } from "../middlewares/auth.js";
import { singleupload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleupload, register);
router.route("/login").post(login);
router.route("/profile").get(authenticate, getUserData);
router.route("/update").put(authenticate, singleupload, updateUserData);
router.route("/all").get(getallusers);
router.route("/delete/:id").delete(deleteUserById);

export default router;
