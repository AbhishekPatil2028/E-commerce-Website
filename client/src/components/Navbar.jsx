import { ShoppingCart } from "lucide-react";
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { setCart } from "../redux/productSlice";
import { toast } from "sonner";
const API = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const {cart} = useSelector(store=>store.product)
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const admin = user?.role === "admin" ? true :false
  
  const logoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      // console.log(accessToken)
      const res = await axios.post(
        `${API}/api/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        localStorage.removeItem("accessToken");
        dispatch(setUser(null))
        dispatch(setCart(null))
        toast.success(res.data.message);
         return navigate('/')
      }
    } catch (error) {
       console.log("LOGOUT ERROR:", error.response?.data || error.message);
      console.log("error in logout handler backend",error.message);

      
    }
  };
  return (
    <header className="bg-pink-50 fixed w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3">
        <div>
          <img src="/E-cart-logo.png" alt="" className="w-[90px] h-[60px]" />
        </div>
        <nav className="flex gap-10 justify-between items-center">
          <ul className="flex gap-7 items-center text-xl font-semibold">
            <Link to={"/"}>
              <li>Home</li>
            </Link>
            <Link to={"/products"}>
              <li>Products</li>
            </Link>
           
            {user && (
              <Link to={`/profile/${user._id}`}>
                <li>Hello,{user.firstName} </li>
              </Link>
            )}
            {admin && (
              <Link to={`/dashboard/sales/`}>
                <li>Dashboard</li>
              </Link>
            )}
          </ul>
          <Link to={"/cart"} className="relative">
            <ShoppingCart />
            <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-5 px-2">
              {user ? cart?.items?.length : 0}
            </span>
          </Link>
          {user ? (
            <Button onClick={logoutHandler} className="bg-pink-600 text-white cursor-pointer">
              Logout
            </Button>
          ) : (
            <Button onClick={()=>navigate('/login')} className="bg-gradient-to-tl from-blue-600 to-purple-600 text-white cursor-pointer">
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
