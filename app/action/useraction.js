"use server";
import connectDB from "@/db/connectDB";
import HomeSettings from "@/models/HomeSettings";
import Product from "@/models/Product";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import Order from "@/models/Order";
import Cartmodel from "@/models/Cartmodel";


// updateHome
export const updateHome = async (data) => {
  await connectDB();
  let updateHomeSettings = await HomeSettings.findOneAndUpdate(
    { key: "home" },

    {
      $set: {
        title: data.title,
        description: data.description,
        BannerImage: data.BannerImage,
        buttonText: data.buttonText,
        featuredProducts: Array.isArray(data.featuredProducts)
          ? data.featuredProducts
          : JSON.parse(data.featuredProducts || "[]"),
      },
    },

    { new: true, upsert: true },
  ).lean();
  revalidatePath("/");
  if (!updateHomeSettings) return null;
  return JSON.parse(JSON.stringify(updateHomeSettings));
};


//GetHome.......................
export const getHome = async () => {
  await connectDB();

  let data = await HomeSettings.findOne({ key: "home" })
    .populate({
      path: "featuredProducts",
      model: Product,
    })
    .lean();

  if (!data) return null;

  return JSON.parse(JSON.stringify(data));
};

// fetchproduct
export const fetchproduct = async () => {
  await connectDB();

  let p = await Product.find({}).lean();

  return p.map((item) => ({
    ...item,
    _id: item._id.toString(),
  }));
};


// AddProduct

export const addProduct = async (data) => {
  
  await connectDB();

  const {
    title,
    name,
    description,
    price,
    images,
    category,
    isDeal,
    salePrice,
    discount,
    stock,
    status
  } = data;

  const product = await Product.create({
    title,
    name,
    description,
    price,
    images,
    category,
    stock,
    isDeal,
    salePrice,
    discount,
    status
  });

  return {
    ...product.toObject(),
    _id: product._id.toString(),
  };
};


// Edit Product

export const editproduct = async (data, _id) => {
  await connectDB();

  const { title, name, description, price, images, category, stock,status } = data;

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    {
      title,
      name,
      description,
      price,
      images,
      category,
      stock,
      status
    },
    { new: true },
  ).lean();

  return {
    ...updatedProduct,
    _id: updatedProduct._id.toString(),
    createdAt: updatedProduct?.createdAt.toISOString(),
    updatedAt: updatedProduct?.updatedAt.toISOString(),
  };
};


// Delete Product
export const DeleteProduct = async (_id) => {
  await connectDB();

  const delpro = await Product.findByIdAndDelete(_id);

  if (!delpro) {
    return null;
  }

  return {
    ...delpro.toObject(),
    _id: delpro._id.toString(),
    createdAt: delpro.createdAt?.toISOString(),
    updatedAt: delpro.updatedAt?.toISOString(),
  };
};


//  fetchUser

export const fetchUser = async () => {
  await connectDB();

  let users = await User.find();

  return users.map((item) => ({
    _id: item._id.toString(),
    name: item.name,
    email: item.email,
    role: item.role,
    status:item.status,
    createdAt: item.createdAt?.toISOString(),
    updatedAt: item.updatedAt?.toISOString(),
  }));
};

import { Types } from "mongoose";

export const addOrder = async (data) => {
  await connectDB();

  const order = await Order.create({
    userId: new Types.ObjectId(data.userId), 
    total: data.total,
    name: data.name,
    status: data.status || "pending",
    orderId: "ORD-" + Date.now(),
    products: Array.isArray(data.products)
      ? data.products.map(item => ({
          productId: new Types.ObjectId(item.productId), 
          qty: item.qty
        }))
      : []
  });

 
  return {
    _id: order._id.toString(),
    userId: order.userId.toString(), 
    orderId: order.orderId,
    total: order.total,
    name: order.name,
    status: order.status,
    products: order.products.map(p => ({
      productId: p.productId.toString(), 
      qty: p.qty
    })),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  };
};



export const fetchOrders = async (userId, role) => {
  await connectDB();

  let orders;

  if (role === "admin" || !userId) {
    orders = await Order.find()
      .populate("products.productId")
      .lean();
  } else {
    orders = await Order.find({ userId })
      .populate("products.productId")
      .lean();
  }

return orders.map((item) => ({
  _id: item._id.toString(),
  userId: item.userId?.toString(),
  orderId: item.orderId,
  name: item.name,
  total: item.total,
  status: item.status,

  products: item.products.map((p) => ({
    qty: p.qty,
    productId: p.productId
      ? JSON.parse(JSON.stringify(p.productId))
      : null,
  })),

  createdAt: item.createdAt?.toISOString(),
  updatedAt: item.updatedAt?.toISOString(),
}));
};


// shipOrder
export const shipOrder = async (_id) => {
  await connectDB();

  let order = await Order.findById(_id);

  if(order.status === "pending"){
    order.status = "shipped";
    await order.save();
  }

  return {
    ...order.toObject(),
    _id: order._id.toString()
  };
};




// addToCart
export const addToCart = async(productId,userId)=>{

await connectDB();

let cart = await Cartmodel.findOne({userId});


if(!cart){

 cart = await Cartmodel.create({
  userId,
  products:[
   {
    productId,
    qty:1
   }
  ]
 })

}
else{

// broken items remove
cart.products = cart.products.filter(
 p=>p.productId
);


let item = cart.products.find(
 p=>p.productId.toString() === productId
);


if(item){
 item.qty += 1;
}
else{
 cart.products.push({
  productId,
  qty:1
 })
}


await cart.save();

}

return JSON.parse(JSON.stringify(cart));

}

  // fetchCart
export const fetchCart = async(userId)=>{
  await connectDB();

  let cart = await Cartmodel.findOne({userId})
    .populate("products.productId")
    .lean()


  if(!cart) return [];


  return cart.products
  .filter(item=>item.productId)
  .map(item=>({
    _id:item.productId._id.toString(),
    name:item.productId.name,
    price:item.productId.price,
    images:item.productId.images,
    qty:item.qty
  }));
}


//updateCartQty
export const updateCartQty = async(productId, qty, userId)=>{

 await connectDB();

 let cart = await Cartmodel.findOne({userId});

 if(!cart) return null;

 let item = cart.products.find(
   p => p.productId?.toString() === productId
 );

 if(item){
   item.qty = qty;
 }

 await cart.save();

 return {
   _id: productId,
   qty: qty
 };
}


//removeFromCart
export const removeFromCart = async(productId,userId)=>{

  await connectDB();

  let cart = await Cartmodel.findOne({userId});

  if(!cart) return null;


  cart.products = cart.products.filter(
    item => item.productId.toString() !== productId
  );


  await cart.save();

  return true;
}



//getUserOrders
export const getUserOrders = async(userId)=>{

 await connectDB();

 let orders = await Order.find({
   userId:userId
 })
 .populate("products.productId")
 .lean();

console.log(orders)
 return JSON.parse(JSON.stringify(orders));

}


//customerfind
export const customerfind= async(name)=>{
  await connectDB()

  let cus = await User.find({
   name:name
  }).lean()
  return JSON.parse(JSON.stringify(cus))

}


//blockUser
export const blockUser = async (_id) => {
  await connectDB();

  let user = await User.findById(_id);

  if(!user) return null;

  if(user.status === "active"){
    user.status = "blocked";
  }
  else{
    user.status = "active";
  }

  await user.save();

  return {
    ...user.toObject(),
    _id: user._id.toString()
  };
};