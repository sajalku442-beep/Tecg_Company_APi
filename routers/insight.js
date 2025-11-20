import express from "express";
import {
  createInsight,
  getAllInsights,
  getInsightById,
  updateInsight,
  deleteInsight,
} from "../controllers/insight.js";
import { authenticate } from "../Middlewares/auth.js";
import { singleupload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/post").post(singleupload, authenticate, createInsight);
router.route("/update/:id").put(singleupload, authenticate, updateInsight);
router.route("/delete/:id").delete(authenticate, deleteInsight);

router.route("/get").get(getAllInsights);
router.route("/get/:id").get(getInsightById);

export default router;
