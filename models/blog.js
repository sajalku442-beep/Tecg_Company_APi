import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
});
export const Blog = mongoose.model("blog", BlogSchema);
