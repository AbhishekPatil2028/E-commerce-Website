import  express from "express";
const  router =  express.Router();
import { addProduct, getAllProducts ,updateProduct,deleteProduct} from "../controllers/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/isAuthenticated.js";
import { multipleUpload } from "../middleware/multer.js";

// Get all products
router.get("/getallproducts",  getAllProducts);

// Add product
router.post("/add", isAuthenticated,isAdmin,multipleUpload, addProduct);
//Update product
router.put("/update/:productId",  isAuthenticated,isAdmin,multipleUpload, updateProduct);
// Delete product
router.delete("/delete/:productId", isAuthenticated,isAdmin, deleteProduct);

export default router