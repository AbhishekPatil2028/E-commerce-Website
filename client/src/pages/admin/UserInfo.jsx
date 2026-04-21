import React ,{useEffect, useState}from 'react'
import { Button } from '../../components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import userLogo from '../../assets/userimg.png'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { toast } from 'sonner'
import {setUser} from '../../redux/userSlice'

console.log("setUser:", setUser)
const UserInfo = () => {
  const navigate = useNavigate()
  const [updateUser, setupdateUser] = useState({
  lastName: "",
  firstName: "",
  email: "",
  phoneNo: "",
  address: "",
  city: "",
  zipCode: "",
  profilePic: "",
  role: ""
})
   const[file,setfile] = useState(null)
   const {user} = useSelector(store=>store.user)
   const params = useParams()
   const userId = params.id

   const dispatch = useDispatch()


   const handChange = (e)=>{
    setupdateUser({...updateUser,[e.target.name]:e.target.value})
  }
  
  const handleImage = (e) => {
    console.log("UpdatedUse-",updateUser)
    const selectedFile = e.target.files[0];
    setfile(selectedFile)
    setupdateUser({...updateUser,profilePic:URL.createObjectURL(selectedFile)})  // preview only
  };
  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    const accessToken = localStorage.getItem("accessToken")
    
    try{
      // use FormData for text + file
      const formData = new FormData()
      console.log("UpdatedUse-",updateUser)
        formData.append("firstName",updateUser.firstName)
        formData.append("lastName",updateUser.lastName)
        formData.append("email",updateUser.email)
        formData.append("phoneNo",updateUser.phoneNo)
        formData.append("address",updateUser.address)
        formData.append("city",updateUser.city)
        formData.append("zipCode",updateUser.zipCode)
        formData.append("role",updateUser.role)

        if(file){
          formData.append("profilePic",file)
        }
 
        const res = await axios.put(`http://localhost:3000/api/user/update/${userId}`,formData,{
          headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"multipart/form-data"
          }
        })
      if (res.data.success) {
  toast.success(res.data.message)

  if (user._id === userId) {
    dispatch(setUser(res.data.user))   // ✅ only self-update
  }

  navigate(-1) // go back to user list
}
    }catch(error){
     console.log(error);
     toast.error("Failed to update profile")
    }

   }

   const getUserDetails = async()=>{
     try{
       const res = await axios.get(`http://localhost:3000/api/user/get-user/${userId}`)
    if(res.data.success){
      setupdateUser(res.data.user)
    }
    }catch(error){
  console.log(error)
    }
   }
     useEffect(()=>{
      getUserDetails()
     },[])

  return (
    <div className='pt-5 min-h-screen bg-gray-100'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
          <div className='flex justify-between gap-10'>
            <Button onClick={()=>navigate(-1)}><ArrowLeft/></Button>
            <h1 className='font-bold mb-7 text-2xl text-gray-800'>Update Profile</h1>
             <div className="flex gap-8 bg-white p-6 rounded-xl shadow">

            {/* Profile Pic (IMAGE) */}
            <div className="flex flex-col items-center gap-3">
              <img
                src={updateUser?.profilePic || userLogo}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-500"
                
              />

              <Label    className="cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                Change Picture
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </Label>
            </div>

            {/* RIGHT SIDE (FORM) */}

            <div className="flex-1 space-y-3">

            <form onSubmit={handleSubmit}  className="space-y-4 shadow-lg p-5 rounded-lg bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name</Label>
                  <Input type='text' 
                   placeholder="firstName"
                    name='firstName' 
                    className="w-60 border rounded-lg px-3 py-2 mt-1" 
                     value={updateUser?.firstName}
                    onChange={handChange}
                   />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input type='text' 
                  name='lastName'
                   placeholder="lastname"
                    className="border rounded-lg px-3 py-2 mt-1"
                    required 
                    value={updateUser?.lastName}
                    onChange={handChange}
                     />
                </div>
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email"
                 placeholder="Enter your email"
                  className="w-80 border rounded-lg px-3 py-2 mt-1"
                  name="email"
                  disabled 
                  required 
                  value={updateUser?.email}
                    onChange={handChange}
                  />
              </div>

              <div>
                <Label>Phone Number</Label>
                <Input type='text' 
                name='phoneNo' 
                placeholder="Enter your contact no" 
                className="w-80 border rounded-lg px-3 py-2 mt-1"
                required 
                value={updateUser?.phoneNo}
                    onChange={handChange}
                />
              </div>

              <div>
                <Label>Address</Label>
                <Input type='text'
                 name='address'
                  placeholder="Enter your address" 
                  className="w-80 border rounded-lg px-3 py-2 mt-1"
                  required 
                  value={updateUser?.address}
                    onChange={handChange}
                  />
              </div>

              <div className="grid grid-cols-2 gap-4">
         <div>
                <Label>City</Label>
                <Input type='text' 
                name='city' 
                placeholder="Enter your city" 
                className="w-full border rounded-lg px-3 py-2 mt-1" 
                required 
                value={updateUser?.city}
                    onChange={handChange}
                />
              </div>

              <div>
                <Label className="block text-sm font-medium">Zip Code</Label>
                <Input type="text"
                 name="zipCode" 
                 className="w-full border rounded-lg px-3 py-2 mt-1"
                  placeholder="Enter your zip code"
                   required
                   value={updateUser?.zipCode}
                    onChange={handChange}
                    />
              </div>

            </div>

            <div className='flex gap-3 items-center'>
              <Label className='block text-sm font-medium'>Role</Label>
              <RadioGroup value={updateUser?.role} 
              onValueChange={(value)=>setupdateUser({...updateUser,role:value})}
              className="flex items-center">
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value="user" id="user"/>
             <Label htmlFor='user'>User</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value="admin" id="admin"/>
             <Label htmlFor='admin'>Admin</Label>
              </div>
              </RadioGroup>
            </div>
            
              <Button 
              type='submit' 
              className="w-100 mt-4 bg-pink-600 hover:bg-pinek-700 text-white font-semibold py-2 rounded-lg">
                Update Profile
              </Button>
            </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
