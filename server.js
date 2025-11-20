import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user.js";
import blogRouter from "./routers/blog.js";
import insightRouter from "./routers/insight.js";
import contactRouter from "./routers/contact.js";

dotenv.config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tech-comapny-front-end.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server!" });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/insight", insightRouter);
app.use("/api/contact", contactRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
