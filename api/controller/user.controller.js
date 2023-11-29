import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js"
import bycryptjs from "bcryptjs";

export const test= (req,res)=>{
    res.send("Api Call is Working")
}

export const update=async (req,res,next)=>{
    if(req.user.id!==req.params.id){
        next(errorHandler(404,"User not found"))
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