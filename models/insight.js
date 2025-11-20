import mongoose from "mongoose";

const insightSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: { type: String },

    summary: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Insight = mongoose.model("insight", insightSchema);
