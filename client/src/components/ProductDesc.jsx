import React from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import axios from 'axios'
import { setCart } from '../redux/productSlice'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
const API = import.meta.env.VITE_API_URL;

const ProductDesc = ({product}) => {
    const accessToken = localStorage.getItem('accessToken')
     const dispatch = useDispatch()
    const addToCart = async(productId)=>{
        try{
            const res = await axios.post(`${API}/api/cart/add`,{productId},{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })

            if(res.data.success){
                toast.success("Product added to cart")
                dispatch(setCart(res.data.cart))
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='font-bold text-4xl text-gray-800'> {product.productName}</h1>
      <p className='text-gray-800'>{product.category} | {product.brand}</p>
      <h2 className='text-pink-500 font-bold text-2xl'>₹{product.productPrice}</h2>
      <p className='line-clamp-4'>{product.productDesc}</p>
      <div className='flex gap-2 items-center w-[300px]'>
        <p>Quantity :</p>
        <Input type='number' className='w-15' defaultValue={1} min={1}/>
      </div>
      <Button onClick={()=>addToCart(product._id)} className='bg-pink-600 w-max cursor-pointer'>Add to Cart</Button>
    </div>
  )  
}

export default ProductDesc
