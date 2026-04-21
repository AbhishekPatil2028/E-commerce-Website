import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import  Home  from '../src/pages/Home'
import  Signup  from '../src/pages/Signup'
import  Login  from '../src/pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Footer from './components/ui/Footer'
import Profile from './pages/Profile'
import Products  from './pages/Products'
import Cart from './pages/Cart'
import AdminSales from './pages/admin/AdminSales'
import AdminProduct from './pages/admin/AdminProduct'
import ShowUserOrders from './pages/admin/ShowUserOrders'
import AdminUsers from './pages/admin/AdminUsers'
import Dashboard from './pages/Dashboard'
import AddProduct from './pages/admin/AddProduct'
import AdminOrders from './pages/admin/AdminOrders'
import UserInfo from './pages/admin/UserInfo'
import ProductedRoute from './components/ProductedRoute'
import SingleProduct from './pages/SingleProduct'
import AddressForm from './pages/AddressForm'
import OrderSuccess from './pages/OrderSuccess'

const router = createBrowserRouter([
  {
    path:'/',
    element:<><Navbar/><Home/> <Footer/></>
  },
  {
    path:'/signup',
    element:<><Signup/></>
  },
  {
    path:'/login',
    element:<><Login/></>
  },
  {
    path:'/verify',
    element:<><Verify/></>
  },
  {
    path:'/verify/:token',
    element:<><VerifyEmail/></>
  },
  {
    path:'/profile/:userId',
    element:<ProductedRoute><Navbar/><Profile/></ProductedRoute>
  },
  
  {
    path:'/products',
    element:<><Navbar/><Products/></>
  },
  
  {
    path:'/products/:id',
    element:<><Navbar/><SingleProduct/></>
  },
  {
    path:'/cart',
    element:<ProductedRoute><Navbar/><Cart/></ProductedRoute>
  },
  {
    path:'/address',
    element:<ProductedRoute><AddressForm/></ProductedRoute>
  },
  {
    path:'/order-success',
    element:<ProductedRoute><OrderSuccess/></ProductedRoute>
  },
  {
    path:'/dashboard',
    element:<ProductedRoute adminOnly={true}><Navbar/><Dashboard/></ProductedRoute>,
    children:[
      {
        path:"sales",
        element:<AdminSales/>
      },
      {
        path:"add-product",
        element:<AddProduct/>
      },
      {
        path:"products",
        element:<AdminProduct/>
      },
      {
        path:"orders",
        element:<AdminOrders/>
      },
      {
        path:"users/orders/:userId",
        element:<ShowUserOrders/>
      },
      {
        path:"users",
        element:<AdminUsers/>
      },
      {
        path:"users/:id",
        element:<UserInfo/>
      },
    ]
  }
 
])

const App = () => {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
