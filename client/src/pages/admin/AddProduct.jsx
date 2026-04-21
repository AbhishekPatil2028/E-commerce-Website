import React, { useState } from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle ,CardFooter} from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import ImageUpload from '../../components/ImageUpload'
import { Button } from '../../components/ui/button'
import { Textarea } from '../../components/ui/textarea' 
import { useDispatch } from 'react-redux'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import {useSelector} from 'react-redux'
import { setProducts } from '../../redux/productSlice'
const API = import.meta.env.VITE_API_URL;

 
  const AddProduct = () =>{
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { products } = useSelector(state => state.product);

  

  const[productData,setProductData] = useState({
    productName:'',
    productPrice:0,
    productDesc:'',
    productImg:[],
    brand:'',
    category:''
  }) 
  const handleChange  = (e)=>{
    const {name,value} = e.target;
    setProductData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const submitHandler = async (e)=>{
    e.preventDefault();
    const formData= new FormData();
    formData.append('productName',productData.productName);
    formData.append('productPrice',productData.productPrice);
    formData.append('productDesc',productData.productDesc);
    formData.append('category',productData.category);
    formData.append('brand',productData.brand);

    if(productData.productImg.length === 0){
      toast.error("Please select at least one image")
      return;
    }

    productData.productImg.forEach((img)=>{
      formData.append("files",img)
    })
 
    try{
      setLoading(true)
      const res = await axios.post(`${API}/api/products/add`,formData,{
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      })
      if(res.data.success){
    dispatch(setProducts([...products, res.data.product]))
        toast.success(res.data.message)
      }
    }catch(error){
      console.log(error)
       toast.error(error.response?.data?.message || "Something went wrong")
    }finally{
      setLoading(false)
    }
    
  }
  return (
        <div className=' py-20 pr-20 mx-auto px-4 bg-gray-100'>
    <Card className='w-full my-20'> 
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
          <CardDescription>enter Product details below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <div className='grid gap-2'>
           <Label>Product Name</Label>
           <Input type='text' name='productName'value={productData.productName}
            placeholder='Ex-Iphone'
            onChange={handleChange}
            required/>
            </div>
            <div className='grid gap-2'>
           <Label>Price</Label>
           <Input type='number'
            value = {productData.productPrice}
            onChange={handleChange}
           name='productPrice' placeholder='' required/>
            </div>

            <div className='grid grid-cols-2 gap-4'>
            <div className='grid gap-2 '>
              <Label>Brand</Label>
              <Input type='text' 
              value={productData.brand}
              onChange={handleChange}
              name='brand' placeholder='Ex-apple' 
              required/>
            </div>
            <div className='grid gap-2 '>
              <Label>Category</Label>
              <Input type='text' 
              value={productData.category}
              onChange={handleChange}
              name='category' placeholder='Ex-mobile' required/>
            </div>
            </div>
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label>Description</Label>
              </div>
    <Textarea name='productDesc' 
    value={productData.productDesc}
              onChange={handleChange}
    placeholder='Enter brief description of product'/>
            </div>
           
       <ImageUpload productData={productData} setProductData={setProductData}/>
          </div>
          <CardFooter className="flex-col gap-2">
            <Button disabled={loading} 
            onClick={submitHandler} className='w-full mt-6 bg-pink-600 cursor-pointer'
            type='submit'>
              {
          loading ? <span className='flex gap-1 items-center'><Loader2 className='animate-spin'/>Please wait</span>
           : 'Add Product'
            }
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
     
    </div>
  )
}

export default AddProduct
