import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  projectDetails: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Contact = mongoose.model("contact", contactSchema);
