import Cart from "../models/cart.js";
import {Product} from "../models/product.js"

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

     // check if product exists
     const product = await Product.findById(productId)
     if(!product){
      return res.status(400).json({
        success:false,
        message:"Product not found"
        
      })
     }
       // find the user's cart (if exists)

    let cart = await Cart.findOne({ userId });
       

    //  If cart does not exist → create
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity:1, price:product.productPrice }],
         totalPrice: product.productPrice
      });
       await cart.save(); // ✅ SAVE

  const populatedCart = await Cart.findById(cart._id)
    .populate("items.productId");

  return res.status(200).json({   // ✅ RETURN
    success: true,
    message: "Product added to cart Successfully",
    cart: populatedCart
  });

    } else {
      //  Check if product already exists
      const itemIndex = cart.items.findIndex(
        (item)=>item.productId.toString() === productId
      )
      if(itemIndex > -1){
        // if product exist  -> just increse quantity
        cart.items[itemIndex].quantity += 1
      }else{
        // if new product -> push to cart
        cart.items.push({
          productId,
          quantity:1,
          price:product.productPrice
        })
      }

      // Recalculate total price

      cart.totalPrice = cart.items.reduce(
       (acc,item)=>acc + item.price*item.quantity,
       0
      )

      // Save updated cart
      await cart.save()

      // Populate  product details before sending response
      const populatedCart = await Cart.findById(cart._id).populate('items.productId')
 
      return  res.status(200).json({
        success: true,
        message: "Product add to cart Successfully ",
        cart:populatedCart
       })
      }
      
  } catch (error) {
   return res.status(500).json({ 
    success:false,
    message:error.message
   });
  }
}

  

// Get cart
export const getCart = async (req, res) => {
 try{
   const userId = req.id;
   const cart = await Cart.findOne({userId}).populate("items.productId")
   if(!cart){
    return res.json({
     success:true, cart:[]
    })
   }
   res.status(200).json({success:true,cart})
 }catch(error){
  return res.status(500).json({
    success:false,
    message:error.message
  })
 }
};

//Update quantity

export const updateQuantity = async(req,res)=>{
    try{
      const userId = req.id;

   const {productId,type} = req.body;


   let cart = await Cart.findOne({userId});
   
   if (!cart) {
      return res.status(404).json({ success:false, message: "Cart not found" });
    }

   const item = cart.items.find(item=>item.productId.toString() === productId);

   if(!item)return res.status(404).json({success:false,message:"Item not found"})

    if(type === "increase") item.quantity += 1
   if(type === "decrease" && item.quantity > 1) item.quantity -= 1;

   cart.totalPrice= cart.items.reduce(
    (acc,item)=> acc + item.price * item.quantity, 0)

    await cart.save()
    cart = await cart.populate("items.productId")

    res.status(200).json({
      success:true,
      message: "Cart Updated Successfully",
      cart
    });

    }catch(error){
  return res.status(500).json({
    success:false,
    message:error.message
  })
 }
}

export const removeFromCart = async(req,res)=>{
    try{
      const userId = req.id;
   const productId = req.params.productId;   // ✅ FIX

    // console.log("productId in backend:", productId);

   let cart = await Cart.findOne({userId});
   if(!cart){
    return res.status(404).json({
      success:false,
      message:"Cart not found"
    })
   }
   if (!productId) {
      return res.status(400).json({
        success: false,
        message: "ProductId is required",
      });
    }

cart.items = cart.items.filter(item => {
  if (!item.productId) return false;

  const id = item.productId._id
    ? item.productId._id.toString()   // populated case
    : item.productId.toString();     // normal case

  return id !== productId;
});
   cart.totalPrice = cart.items.reduce(
    (acc,item)=> acc + item.price * item.quantity,0)

   await cart.save();
   cart = await cart.populate("items.productId")
  
       res.status(200).json({
        success:true,
        message:"Item Removed from cart",
        cart
       })

    }catch(error){
      console.log("ERROR:", error);  
   return res.status(500).json({
    success:false,
    message:error.message
   })
}
}