import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true
    },
    Avatar:{
      type:String,
      default:"https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg"
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
