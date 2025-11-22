import express from "express";
import { Blog } from "../models/blog.js";
import getDataUri from "../utils/dataurl.js";
import cloudinary from "../utils/cloudinary.js";

export const postblog = async (req, res) => {
  try {
    const { tag, title, content, category } = req.body;
    if (!tag || !title || !content || !category) {
      return res.json({ message: "All fields are required.", success: false });
    }

    const user = req.user;

    const file = req.file;
    let imageUploadResponse;
    if (file) {
      const fileUri = getDataUri(file);
      imageUploadResponse = await cloudinary.uploader.upload(fileUri.content);
      console.log(imageUploadResponse);
      if (!imageUploadResponse) {
        return res.json({ message: "Image upload failed.", success: false });
      }
    }

    const blog = await Blog.create({
      tag: tag,
      title: title,
      content: content,
      category: category,
      image: imageUploadResponse?.secure_url || "",
      user: user._id,
    });

    return res.json({
      message: "Blog posted successfully.",
      blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user").sort({ createdAt: -1 });
    return res.json({
      message: "Post Fetched SucessFully",
      blogs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("user");
    if (!blog) {
      return res.json({ message: "Blog not found", success: false });
    }
    return res.json({
      message: "Blog fetched successfully",
      blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateBlogById = async (req, res) => {
  try {
    console.log(req.body);

    const { id } = req.params;
    const { tag, title, content } = req.body;
    if (!tag || !title || !content) {
      return res.json({ message: "All fields are required", success: false });
    }
    const blog1 = await Blog.findById(id);
    if (!blog1) {
      return res.json({ success: false, message: "Insight not found" });
    }

    let newImage = blog1.image;
    const file = req.file;
    let imageUploadResponse;
    if (file) {
      const fileUri = getDataUri(file);
      imageUploadResponse = await cloudinary.uploader.upload(fileUri.content);
      console.log(imageUploadResponse);
      if (!imageUploadResponse) {
        return res.json({ message: "Image upload failed.", success: false });
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        tag,
        title,
        content,

        image: imageUploadResponse?.secure_url || newImage,
      },
      { new: true }
    );
    return res.json({
      message: "Blog updated successfully",
      blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.json({ message: "Blog not found", success: false });
    }
    return res.json({
      message: "Blog deleted successfully",
      blog,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getBlogsByUserId = async (req, res) => {
  try {
    const user = req.user;
    const post = await Blog.find({ user: user._id })
      .populate("user")
      .sort({ createdAt: -1 });
    if (!post || post.length === 0) {
      return res.json({
        message: "No blogs found for this user",
        success: false,
      });
    }
    return res.json({
      message: "Blogs fetched successfully",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
