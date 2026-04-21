// import * as React from "react";
// import { Tabs } from "radix-ui";
// import { Label } from "radix-ui";

// const Profile = () => (
//     <div className="min-h-screen flex justify-center items-center">
        
    
// 	<Tabs.Root
// 		className=" flex w-[300px] flex-col  shadow-[0_2px_10px] shadow-blackA2 "
// 		defaultValue="tab1"
// 	>
// 		<Tabs.List
// 			className="flex shrink-0 border-b border-mauve6"
// 			aria-label="Manage your account"
// 		>
// 			<Tabs.Trigger
// 				className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
// 				value="tab1"
// 			>
// 				Profile
// 			</Tabs.Trigger>
// 			<Tabs.Trigger
// 				className="flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none text-mauve11 outline-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
// 				value="tab2"
// 			>
// 				Orders
// 			</Tabs.Trigger>
// 		</Tabs.List>
// 		<Tabs.Content
// 			className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
// 			value="tab1"
// 		>
// 		</Tabs.Content>
// 		<Tabs.Content
// 			className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
// 			value="tab2"
// 		>
// 			<div>
//             <div className="flex flex-cl justify-center items-center bg-gray-100">
//                 <h1 className="font-bold mb-7 text-2xl text-gray-800">Update Profile</h1>
//                 <div className="w-full flex gap-10 justify-between items-start px-7 max-w-2xl">
//                     {/*profile picture*/}
//                     <div className="flex flex-col items-center">
//                         <img src="/abhi img2.jpeg" alt="profile" className="w-32 h-32 rounded-full object-cover border-4 border-pink-800" />
//                         <label className='mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700'>Change Picture</Label>


//                     </div>

//                 </div>

//             </div>
//             </div>
// 		</Tabs.Content>
// 	</Tabs.Root>
//     </div>
// );

// export default Profile;



import React, { useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userLogo from '../assets/userimg.png';
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "../redux/userSlice";
import MyOrder from "./MyOrder";

const Profile = () => {
  const [file, setfile] = useState(null);
  const dispatch = useDispatch()

const handChange = (e)=>{
    setupdateUser({...updateUser,[e.target.name]:e.target.value})
  }
  
  const handleImage = (e) => {
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
      console.log(updateUser)
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
  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
} 
console.log("UserId",userId)
        const res = await axios.put(`http://localhost:3000/api/user/update/${userId}`,formData,{
          headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"multipart/form-data"
          }
        })
        if(res.data.success){
          toast.success(res.data.message)
          dispatch(setUser(res.data.user))
        }

    }catch(error){
     console.log(error);
     toast.error("Failed to update profile")
    }

   }
   

  const{user} = useSelector(store=>store.user)
   
    // const params = useParams()
    // console.log("params:",params)
    const userId = user?._id
    console.log("userId: 2",userId)
    const [updateUser, setupdateUser] = useState({
      lastName:user?.lastName,
      firstName:user?.firstName,
      email:user?.email,
      phoneNo:user?.phoneNo,
      address:user?.address,
      city:user?.city,
      zipCode:user?.zipCode,
      profilePic:user?.profilePic,
      role:user?.role
    })

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 pt-20">
      <Tabs defaultValue="profile" className="w-full max-w-3xl">
        
        {/* Tabs */}
        <TabsList className="mx-auto grid w-[200px] grid-cols-2 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <h2 className="text-center text-xl font-semibold mb-6">
            Update Profile
          </h2>

          <div className="flex gap-8 bg-white p-6 rounded-xl shadow">

            {/* LEFT SIDE (IMAGE) */}
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
                    required 
                    value={updateUser.firstName}
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
                    value={updateUser.lastName}
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
                  value={updateUser.email}
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
                value={updateUser.phoneNo}
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
                  value={updateUser.address}
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
                value={updateUser.city}
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
                   value={updateUser.zipCode}
                    onChange={handChange}
                    />
              </div>

            </div>
              


              <Button 
              type='submit' 
              className="w-100 mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg">
                Update Profile
              </Button>
            </form>
            </div>
          </div>
        </TabsContent>

        {/* ORDERS TAB */}
        <TabsContent value="orders">
         <MyOrder/>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default Profile;
