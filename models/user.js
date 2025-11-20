import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("user", userSchema);
