import express from "express";
 import dotenv from "dotenv";
import connectDB from "./config/dbconnect.js";
import  userRoutes from "./routes/userRoutes.js";
import  productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors({
    origin:['http://localhost:5173',
        "https://e-commerce-website-k49v.onrender.com"
    ],
    credentials:true
}))
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("API Running");
});

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

connectDB();

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
