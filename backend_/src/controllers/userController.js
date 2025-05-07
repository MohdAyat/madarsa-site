import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
// import cook
// filepath: d:\Projects\madarsa-site\backend\src\controllers\userController.js

async function generateAccessandRefreshToken(userid){
    try {
      const user = await User.findById(userid)
      const accessToken = await user.generateAccessToken()
      const refreshToken = await user.generateRefreshToken()
      await user.save({ validateBeforeSave: false })
      return {accessToken,refreshToken}
    } catch (error) {
      throw new ApiError(500,"error while generating tokens",error)
    }
}
// Register User
export const registerUser = async (req,res) => {
    try {
        // console.log("registerUser controller called");
        // console.log("req.body in registerUser controller: ",req.body);
        
        const { fullName, email, password, confirmPassword, city, state, country, role } = req.body;

        if(
            [fullName,email,password,confirmPassword].some((field)=> field?.trim()==="")
          ){
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

    
        const user = await User.create({
            fullName,
            email,
            password,
            city,
            state,
            country,
            role,
        });
        // console.log("created user in registerUser controller: ",user);
        
        const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            domain: 'https://madarsa-site.onrender.com', // Replace with your actual backend domain
            path: '/',
        }
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ message: "User registered successfully", user });
    } catch (error) {
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Login User
export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;

        if ([email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return req.status(401).json({ message: "Invalid email or user is not registered" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return req.status(401).json({ message: "wrong password" });
        }

        const {accessToken,refreshToken} = await generateAccessandRefreshToken(user._id)

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            domain: 'https://madarsa-site.onrender.com', // Replace with your actual backend domain
            path: '/',
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: loggedInUser
        });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

export const logoutUser = async (req,res) => {
    console.log("req.user in logoutuser controller: ",req.user);
    
    const user = await User.findByIdAndUpdate(req.user._id,
        {
          $set:{refreshToken : undefined}
        },
        {
          new: true
        }
    )
    if(!user){
        return res.status(400).json({message: "User not found,something went wrong while logging out"})
    }
    const options = {
        httpOnly : true,
        secure: true,
        sameSite: "None",
        domain: 'https://madarsa-site.onrender.com', // Replace with your actual backend domain
        path: '/',
    }
    
    res.status(201)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({
        message: "Logout successful",
    })
}

export const isLoggedIn = async (req,res) => {
    // console.log(req.user);
    
    if (req.user) {
        res.json({ loggedIn: true, user: req.user });
      } else {
        res.json({ loggedIn: false });
      }
}
