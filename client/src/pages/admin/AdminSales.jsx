import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart
} from "recharts";
const AdminSales = () => {
  const [stats,setStats] = useState({
    totalUsers:0,
    totalProducts:0,
    totalOrders:0,
    totalSales:0,
    salesByDate:[]
  })
  const API = import.meta.env.VITE_API_URL;

  const fetchStats = async()=>{
    try{
    const accessToken = localStorage.getItem("accessToken")
    const res = await axios.get(`${API}/api/orders/sales`,{
     headers:{
      Authorization:`Bearer ${accessToken}`
     }
    })
    // console.log(res)
    if(res.data.success){
      setStats(res.data)
    }
    }catch(error){
        console.log(error);
        
    }
  }

  useEffect(()=>{
    fetchStats()
  },[])
  return (
    <div className=' bg-gray-100 py-20 pr-20 mx-auto px-4'>
      <div className='p-6 grid gap-6 lg:grid-cols-4'>
        {/* stats card */}
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{stats.totalUsers}</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{stats.totalOrders}</CardContent>
        </Card>
         <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>
             Total Products 
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{stats.totalProducts}</CardContent>
        </Card>
        <Card className="bg-pink-500 text-white shadow">
          <CardHeader>
            <CardTitle>
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{stats.totalSales}</CardContent>
        </Card>
       
             {/* sales chart */}

             <Card className='lg:col-span-4'>
              <CardHeader>
                <CardTitle>Sales (Last 30 Days)</CardTitle>
                
               </CardHeader>
               <CardContent style={{height:300}}>

                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.salesByDate}>
                  <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
<Area dataKey="amount" stroke="#F472B6" fill="#F472B6" />    
   </AreaChart>

                </ResponsiveContainer>
               </CardContent>
             </Card>

      </div>
    </div>
  )
}

export default AdminSales
