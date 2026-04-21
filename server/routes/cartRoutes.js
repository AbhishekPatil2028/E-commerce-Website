import  express from "express";
const  router =  express.Router();
import {  isAuthenticated } from "../middleware/isAuthenticated.js";
import { addToCart, removeFromCart,getCart ,updateQuantity} from "../controllers/cartController.js";

// Get all products
router.get("/", isAuthenticated, getCart);

// Add product
router.post("/add", isAuthenticated,addToCart);
//Update product
router.put("/update",  isAuthenticated,updateQuantity);
// Delete product
router.delete("/remove/:productId", isAuthenticated,removeFromCart);

export default router