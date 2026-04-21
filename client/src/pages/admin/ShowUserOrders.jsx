import React, { useEffect, useState } from 'react'
import OrderCard from '../../components/OrderCard'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL;

const ShowUserOrders = () => {
  const [userOrder, setUserOrder] = useState(null)
  const params = useParams()

  const getUserorders = async()=>{
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${API}/api/orders/user-order/${params.userId}`,{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    if(res.data.success){
      setUserOrder(res.data.orders)
    }

  }

  useEffect(()=>{
   getUserorders()
  },[])

  // console.log(userOrder)
  return (
    <div className=' py-20'>
    <OrderCard userOrder={userOrder}/>
    </div>
  )
}

export default ShowUserOrders
