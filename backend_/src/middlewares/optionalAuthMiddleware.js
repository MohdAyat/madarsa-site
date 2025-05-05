import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js"

const optionalJwtVerify = async (req, res, next) => {
  try {
    const givenToken =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!givenToken) {
      req.user = null;
      return next();
    }

    const decodedToken = jwt.verify(givenToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken._id)?.select("-password -refreshToken");

    req.user = user || null;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

export { optionalJwtVerify };