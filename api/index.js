import express, { request, response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./Routes/user.route.js";
import authRouter from "./Routes/auth.route.js";
dotenv.config();
const App = express();
App.use(express.json());

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
App.use("/api/auth",authRouter)

App.use((error,req,res,next)=>{
  const statusCode= error.statusCode || 500;
  const message= error.message || "Internal Server Message";
  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})