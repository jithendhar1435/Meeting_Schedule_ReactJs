import userModel from "../models/UserModel.js";

import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from 'jsonwebtoken'


//USER REGISTRATION
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
   
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};


// USER LOGIN
export const login =async (req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(200).send({
                success:false,
                message:"Invalid Email or Password"
            })
        }
//check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"User is not registered"
            })
        }
        const match =await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        
        //token
        const token =  JWT.sign(
            {_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
            )
            res.status(200).send({
                success:true,
                message:'login successfully',
                user:{
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    address:user.address,
                    role:user.role
                },
                token
            })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in login",
            error
        })
    }
}

// Test Route
export const test = async (req,res) =>{
    res.send("Protected Route")
}

//Forgot Password

export const forgotpassword= async (req,res)=>{
  try{
      const {email,answer,newPassword} =req.body
      if(!email){
        res.status(200).send({message:"Email is required"})
      }
      if(!answer){
        res.status(200).send({message:"Answer is required"})
      }
      if(!newPassword){
        res.status(200).send({message:"New Password is required"})
      }

      const user = await userModel.findOne({email,answer})
      if(!user){
        return res.status(200).send({
          success:false,
          message:"Wrong Email or Answer"
        })
      }

      const hashed=await hashPassword(newPassword)
      await userModel.findByIdAndUpdate(user._id,{password:hashed})
      res.status(200).send({
        success:true,
        message:"Password Reset Successfully"
      })
  }
  catch(error){
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Something went wrong",
      error
    })
  }
}