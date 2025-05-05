import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  fullName:{
    type: String,
    required: true,
    lowercase: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
  },
  state: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true,
    lowercase: true,
  },
    role: {
    type: String,
    enum: ['student', 'teacher'],
    },
  password: {
    type: String,  //we will encrypt password first
    required: [true,'password is required']
  },
  refreshToken:{
    type: String
  },
},{timestamp: true})

userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10)
  next()
})


userSchema.methods.isPasswordCorrect =async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    fullName: this.fullName,
    email: this.email,
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
  })
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  })
}

export const User = mongoose.model("User",userSchema)