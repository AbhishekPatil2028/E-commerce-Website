import React, { useEffect,useState } from 'react'
import { setUser } from '../../redux/userSlice'
import axios from 'axios'
import {Search} from 'lucide-react'
import UserLogo from '../../assets/userimg.png'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Edit } from 'lucide-react'
import { Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const[searchTerm,setSearchTerm] = useState("")
  const navigate = useNavigate()
  
  const getAllUsers = async()=>{
    const accessToken = localStorage.getItem("accessToken")
    console.log("Token",accessToken)
    try{
       const res = await axios.get('http://localhost:3000/api/user/all-user',{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
       })
       if(res.data.success){
       setUsers(res.data.users)
 }
    }catch(error){
      console.log(error)
    }
  
  }
  const filteredUsers = users.filter(user=>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(()=>{
    getAllUsers()
  },[])



  return (
    <div className="pl-[300px] pt-25 py-16 pr-10 max-w-7xl mx-auto">
  
  {/* Header */}
  <div className="flex justify-between items-center">
    <div>
      <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
      <p className="text-gray-500 mt-1">View and manage registered users</p>
    </div>

    {/* Search */}
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1 text-gray-400 w-5" />
      <Input
      value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} 
      className="pl-10 py-2 rounded-lg border focus:ring-2 focus:ring-pink-400"
        placeholder="Search users..."
      />
    </div>
  </div>

  {/* Users Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
    {
    filteredUsers.map((user) => {
      return (
        <div
          key={user._id}
          className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-5 border"
        >
          {/* User Info */}
          <div className="flex items-center gap-4">
            <img
              src={user?.profilePic || UserLogo}
              alt=""
              className="w-14 h-14 rounded-full object-cover border-2 border-pink-500 flex-shrink-0"
            />

            <div className="min-w-0">
              <h1 className="font-semibold text-gray-800 text-lg">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-5">
            <Button onClick={()=>navigate(`/dashboard/users/${user?._id}`)} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer">
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>

            <Button onClick={()=>navigate(`/dashboard/users/orders/${user?._id}`)}   className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer">
              <Eye className="w-4 h-4 mr-1" />Show Order
            </Button>
          </div>
        </div>
      );
    })}
  </div>
</div>
  )
}

export default AdminUsers


