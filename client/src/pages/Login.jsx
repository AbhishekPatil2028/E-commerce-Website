 import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'
const API = import.meta.env.VITE_API_URL;


const Login = () => {

  
    const [showpassword ,setshowpassword] = useState(false)
    const [loading,setLoading] = useState(false)
    const [formData,setformData]= useState({
        
        email:"",
        password:"",
    })
    const navigate = useNavigate()
    const dispatch = useDispatch(); 

    const handleChange = (e)=>{
        const{name,value} = e.target;
        setformData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const submitHandler = async(e)=>{
        e.preventDefault()
        // console.log(formData)
        try{
          setLoading(true)
       const res = await axios.post(`${API}/api/user/login`,formData,{
        headers:{
            "Content-Type":"application/json"
        }
       })
       if(res.data.success){
       navigate('/')
       dispatch(setUser(res.data.user))
        localStorage.setItem("accessToken",res.data.accessToken)
       toast.success(res.data.message)
       }
        }catch(error){
        console.log(error)
        const message = error.response?.data?.message || error.message || "Something Went wrong"
        toast.error(message)
        
        } finally{
          setLoading(false)
        }
    }
  return (
    <div className='flex justify-center items-center min-h-screen bg-pink-100'>
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login your account</CardTitle>
        <CardDescription>
          Enter detail to Login your account
        </CardDescription>
        
      </CardHeader>
      <CardContent>
       
          <div className="flex flex-col gap-4">
            {/* <div className="grid gap-2">
                <div className='grid gap-2'>
                    <Label htmlFor="firstName">First Name</Label>
                   <Input id='firstName' name="firstName" type="text" placeholder="First Name" required
                    value={formData.firstName}
                onChange={handleChange}
                />
                </div>
                <div className='grid gap-2'>
                    <Label htmlFor="lastName">Last Name</Label>
                   <Input id='lastName' name="lastName" type="text" placeholder="Last Name" required
                    value={formData.lastName}
                onChange={handleChange}
                   />
                </div>
            </div> */}
            <div className='grid gap-2'>

              <Label htmlFor="email">Email</Label>
              
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                />
                </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <div className='relative'>

              <Input id="password" name="password" placeholder=" Password" type={showpassword ? 'text':'password'} required 
               value={formData.password}
                onChange={handleChange}
              />
              {
                 showpassword ? <EyeOff onClick={()=>{setshowpassword(false)}} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 '/>:
                 <Eye onClick={()=>setshowpassword(true)} className='w-5 h-5 text-gray-700 absolute right-5 bottom-2 '/>
              }
              </div>
            </div>
          </div>
     
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button  onClick={submitHandler} type="submit" className="w-full cursor-pointer bg-pink-600 hover:bg-pink-500">
         {loading? <><Loader2 className='h-4 w-4 animate-spin mr-2'/>Please wait</>:'Login'}
        </Button>
       <p className='text-gray-700 text-sm'>Don't have an account ? <Link to={"/signup"} className="hover:underline cursor-pointer text-pink-pointer">Signup</Link></p>
      </CardFooter>
    </Card>

    </div>
  )
}

export default Login
