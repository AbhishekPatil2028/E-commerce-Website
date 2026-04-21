
import express from "express";
const router = express.Router();

import authMiddleware from "../middleware/authMiddleware.js";
import { isAuthenticated ,isAdmin} from "../middleware/isAuthenticated.js";
import { registerUser,loginUser,logout,verify,reVerify ,forgotPassword, verifyOTP, changePassword, allUser, getUserById, updateUser} from "../controllers/userController.js";
import { singleUpload } from "../middleware/multer.js";

// Register user
router.post("/register", registerUser);
router.post("/verify", verify);
router.post("/reverify", reVerify);

 
// Login
router.post("/login", loginUser);

  router.get("/profile",authMiddleware,(req,res)=>{
    res.json({
      message:"Protected route accessed",
      userId:req.user.id
    })
  })

  // Logout
  router.post("/logout", isAuthenticated,logout)

  router.post("/forgotPassword",forgotPassword)
  router.post("/verify-otp/:email",verifyOTP)
  router.post("/change-password/:email",changePassword)
  router.get('/all-user',isAuthenticated, isAdmin,allUser)
  router.get('/get-user/:userId',getUserById)
  router.put('/update/:id',isAuthenticated,singleUpload,updateUser)
  

export default router