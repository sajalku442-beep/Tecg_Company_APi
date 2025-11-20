import express from "express";
import {
  deleteBlogById,
  getAllBlogs,
  getBlogById,
  getBlogsByUserId,
  postblog,
  updateBlogById,
} from "../controllers/blog.js";
import { authenticate } from "../Middlewares/auth.js";
import { singleupload } from "../middlewares/multer.js";

const router = express.Router();
router.route("/post").post(singleupload, authenticate, postblog);
router.route("/get").get( getAllBlogs);
router.route("/get/:id").get( getBlogById);
router.route("/update/:id").put(singleupload, authenticate, updateBlogById);
router.route("/delete/:id").delete(authenticate, deleteBlogById);
router.route("/userpost").get(authenticate, getBlogsByUserId);

export default router;
