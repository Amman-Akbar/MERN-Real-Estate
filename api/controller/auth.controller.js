import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { Username, Email, Password } = req.body;
  const hashedpass=bcryptjs.hashSync(Password,10)
  const newUser = new User({ Username, Email, Password:hashedpass });
  try {
    await newUser.save();
  res.status(201).json("User created successfully")
  } catch (error) {
    res.status(500).json(error.message)
  }
};
