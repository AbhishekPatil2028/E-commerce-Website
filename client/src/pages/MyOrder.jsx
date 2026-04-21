import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
const API = import.meta.env.VITE_API_URL;

const MyOrder = () => {
    const [userOrder,setuserOrder] = useState();

        
        const getUserOrders = async()=>{
            const accessToken = localStorage.getItem('accessToken')
            const res = await axios.get(`${API}/api/orders/myorder`,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                }
            })
            if(res.data.success){
                setuserOrder(res.data.orders)
            }
        }

       
    useEffect(()=>{
       getUserOrders()
    },[])

  return (
    <>
    <OrderCard userOrder={userOrder}/>
    </>
  )
}


export default MyOrder
