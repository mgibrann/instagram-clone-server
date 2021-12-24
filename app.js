import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRoutes from "./routes/user.js";
import postsRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center;'>Welcome to Instagram clone api</h1>"
  );
});

app.use("/user", userRoutes);
app.use("/posts", postsRoutes);

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
