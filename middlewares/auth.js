import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Auth");

    if (!token) {
      return res.json({ message: "Login first", success: false });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.json({ message: "Invalid Token Login again", success: false });
    }
    const id = decoded.id;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
