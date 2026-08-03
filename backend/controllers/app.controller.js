import { generateWebToken } from "../config/generateToken.js"
import User from "../models/app.model.js"
import bcrypt from "bcrypt"

export const signup = async (req,res) => {
  try {

    let {firstName,lastName,userName,email,password } = req.body

    if(!firstName || !lastName ||!userName || !email || !password){
        return res.status(400).json({message : "send all details"})
    }

    let existUser = await User.findOne({email})

    if(existUser){
      return res.status(400).json({message : "User already exist"})
    }
    let existUserName = await User.findOne({userName})

    if(existUserName){
      return res.status(400).json({message : "Username already exist"})
    }

    let hashPassword = await bcrypt.hash(password,10)
    
    let newUser = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password : hashPassword
    })
    
    let token;
    try {
      token = generateWebToken(newUser._id)
    } catch (error) {
      return res.status(401).json({message : "token Error"})
    }

    res.cookie("token",token,{
      httpOnly : true,
      secure : process.env.NODE_ENV === "DEVELOPMENT",
      sameSite : "lax",
      maxAge : 7*24*60*60*1000
    })

    return res.status(200).json({
        firstName,
        lastName,
        userName,
        email
    })
    
  } catch (error) {
    res.status(400).json({message : message.error})
  }
}


export const login = async (req,res) => {
  try {

    let {email,password} = req.body

    if(!email || !password){
        return res.status(400).json({message : "send all details"})
    }

    let existUser = await User.findOne({email})

    if(!existUser){
      return res.status(400).json({message : "User doesn't exist"})
    }

    let hashPassword = await bcrypt.compare(password,existUser.password)
    if(!hashPassword){
      return res.status(401).json({message : "Password Incorrect"})
    }
    
    let token;
    try {
      token = generateWebToken(existUser._id)
    } catch (error) {
      return res.status(401).json({message : "token Error"})
    }

    res.cookie("token",token,{
      httpOnly : true,
      secure : process.env.NODE_ENV === "DEVELOPMENT",
      sameSite : "lax",
      maxAge : 7*24*60*60*1000
    })

    return res.status(200).json({
        firstName : existUser.firstName,
        lastName : existUser.lastName,
        userName : existUser.userName,
        email : existUser.email
    })
    
  } catch (error) {
    res.status(400).json({message : message.error})
  }
}


export const logout = async (req,res)=>{
  try {
     res.clearCookie("token",{
      httpOnly : true,
      secure : process.env.NODE_ENV === "DEVELOPMENT",
      sameSite : "lax"
    })

    return res.status(200).json({message : "Logout Successfully"})
  } catch (error) {
    return res.status(400).json({message : error.message})
  }
}