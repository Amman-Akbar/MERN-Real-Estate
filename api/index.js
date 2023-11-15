import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js";
dotenv.config();
const App = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

App.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
App.use("/api/user",userRouter)