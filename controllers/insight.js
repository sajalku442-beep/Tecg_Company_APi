import { Insight } from "../models/insight.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataurl.js";

export const createInsight = async (req, res) => {
  try {
    console.log(req.body);

    const { title,category, summary, content } = req.body;

    if (!title || !summary || !content) {
      return res.json({
        success: false,
        message: "All fields are required.",
      });
    }

    let imageUrl = "";
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const upload = await cloudinary.uploader.upload(fileUri.content);
      imageUrl = upload.secure_url;
    }

    const insight = await Insight.create({
      title,
      category,
      summary,
      content,
      image: imageUrl,
      user: req.user?._id, // only admin
    });

    return res.json({
      success: true,
      message: "Insight created successfully.",
      insight,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getAllInsights = async (req, res) => {
  try {
    const insights = await Insight.find().sort({ createdAt: -1 });

    return res.json({
      message: "Insights fetched successfully",
      success: true,
      insights,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Failed to fetch insights",
    });
  }
};
export const getInsightById = async (req, res) => {
  try {
    const id = req.params.id;

    const insight = await Insight.findById(id);
    if (!insight) {
      return res.json({ success: false, message: "Insight not found" });
    }

    return res.json({
      message: "Insight fetched successfully",
      success: true,
      insight,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to fetch insight" });
  }
};
export const updateInsight = async (req, res) => {
  try {
    const id = req.params.id;
    const { title,category, summary, content } = req.body;

    const insight = await Insight.findById(id);
    if (!insight) {
      return res.json({ success: false, message: "Insight not found" });
    }

    let newImage = insight.image;

    if (req.file) {
      const fileUri = getDataUri(req.file);
      const upload = await cloudinary.uploader.upload(fileUri.content);
      newImage = upload.secure_url;
    }

    const updated = await Insight.findByIdAndUpdate(
      id,
      {
        title: title || insight.title,
        category: category || insight.category,
        summary: summary || insight.summary,
        content: content || insight.content,
        image: newImage,
      },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Insight updated successfully",
      updated,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Update failed" });
  }
};
export const deleteInsight = async (req, res) => {
  try {
    const id = req.params.id;

    const insight = await Insight.findById(id);
    if (!insight) {
      return res.json({ success: false, message: "Insight not found" });
    }

    await Insight.findByIdAndDelete(id);

    return res.json({
      success: true,
      message: "Insight deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Delete failed" });
  }
};
