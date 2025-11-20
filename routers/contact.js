import express from "express";
import {
  createContact,
  deleteContact,
  getAllContacts,
} from "../controllers/contact.js";

const router = express.Router();

router.route("/submit").post(createContact); // public form
router.route("/all").get(getAllContacts); // admin only (optional)
router.route("/delete/:id").delete(deleteContact); // admin delete

export default router;
