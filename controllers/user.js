import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataurl.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    console.log("Register request body and ", req.body, req.file);

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ message: "All fields are required.", success: false });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists.", success: false });
    }
    const hasshedPassword = await bcrypt.hash(password, 10);
    const file = req.file;
    let imageCloudresponse;
    if (file) {
      const fileUrl = getDataUri(file);
      imageCloudresponse = await cloudinary.uploader.upload(fileUrl.content);
      console.log(imageCloudresponse);

      if (!imageCloudresponse) {
        return res.json({ message: "Image upload failed", success: false });
      }
    }
    const user = await User.create({
      username,
      email,
      image: imageCloudresponse?.secure_url || "",
      password: hasshedPassword,
    });
    return res.json({
      message: "User registered successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        message: "All fields are required.",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User does not exist.", success: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ message: "Invalid password.", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({
      message: "Login successful.",
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserData = async (req, res) => {
  try {
    const user = req.user;
    return res.json({
      message: "user founded successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const updateUserData = async (req, res) => {
  try {
    console.log(req.body);

    const { username, email, password } = req.body;
    let user = req.user;
    let hasspassword;
    if (password) {
      hasspassword = await bcrypt.hash(password, 10);
    }

    const file = req.file;
    let imageCloudresponse;
    if (file) {
      const fileUrl = getDataUri(file);
      imageCloudresponse = await cloudinary.uploader.upload(fileUrl.content);
      console.log(imageCloudresponse);

      if (!imageCloudresponse) {
        return res.json({ message: "Image upload failed", success: false });
      }
    }
    user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: username || user.username,
        email: email || user.email,
        image: imageCloudresponse?.secure_url || "",
        password: hasspassword || user.password,
      },
      { new: true }
    );
    return res.json({
      message: "user updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    return res.json({
      message: "User deleted successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getallusers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({
      message: "Users fetched successfully",
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
