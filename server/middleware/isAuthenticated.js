import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(400).json({
            success: false,
            message: "Authorization token is missing or invalid",
        });
    }
    const token = authHeader.split(" ")[1];

   

    let decoded
    console.log("SECRET_KEY",process.env.SECRET_KEY)
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          messsage: "The registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }
console.log("DECODED:", decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = user
    console.log(user)
    req.id = user._id;
    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const isAdmin = (req,res,next)=>{
  if(req.user && req.user.role === 'admin'){
    next()
  }else{
    return res.status(403).json({
      message:"Access denied: admins only"
    })
  }
}
