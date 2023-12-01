import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bycryptjs from "bcryptjs";

export const test= (req,res)=>{
    res.send("Api Call is Working")
}

export const update=async (req,res,next)=>{
    if(req.user.id!==req.params.id){
        next(errorHandler(404,"You can only update your own account"))
    }
    try {
        if(req.body.Password){
            req.body.Password=bycryptjs.hashSync(req.body.Password,10)
        }
        const updatedUser= await User.findByIdAndUpdate(req.params.id,{
            $set:{
                Username:req.body.Username,
                Email:req.body.Email,
                Password:req.body.Password,
                Avatar:req.body.Avatar
            }
        },{new:true})
        const {Password,...rest}=updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

export const deleteUser=async (req,res,next)=>{
    if (req.user.id!==req.params.id){
        next(errorHandler(404,"You can only delete your own account"));
    }
    try {
        await User.findByIdAndDelete(req.params.id)
        res.clearCookie("access_token")
        res.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
    
}