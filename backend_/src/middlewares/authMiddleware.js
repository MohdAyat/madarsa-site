import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js"


const jwtVerify = async(req,res,next)=>{
  try {
    const givenToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    // console.log("cookies in middleware: ",req.cookies);
    
    // console.log("given token in middleware: ",givenToken);
    
    if(!givenToken){
      throw new Error("token not found in middleware",401)
    }
    const decodedToken = jwt.verify(givenToken,process.env.ACCESS_TOKEN_SECRET);
    // console.log("decoded token in middleware: ",decodedToken);
    const user = await User.findById(decodedToken._id)?.select("-password -refreshToken")
    if(!user){
      throw new Error("user not found with token in middleware",401)
    }
    req.user = user
    next()
  } 
  catch (error) {
    throw new Error("jwtVerify middleware error: "+error?.message,401)
  }

}

export {jwtVerify}