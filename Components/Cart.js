 "use client";

import React, {useEffect,useState} from "react";
import {  fetchCart,updateCartQty,removeFromCart  } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Cart = () => {
const [cart,setCart] = useState([]);

const {data:session} = useSession();
const userId = session?.user?._id;

 // Fetch cart items when user logs in
useEffect(()=>{
if(!userId) return;

const getData = async()=>{
let data = await fetchCart(userId);
setCart(data);
}
getData();
},[userId]);



// Decrease product quantity
const decreaseQty = async(id)=>{

  let item = cart.find(i=>i._id === id);
 // Prevent quantity less than 1
  if(!item || item.qty <= 1) return;

  let updated = await updateCartQty(
    id,
    item.qty - 1,
    userId
  );

  if(!updated) return;

 // Update state
  setCart(cart.map(i =>
    i._id === id
      ? { ...i, qty: updated.qty }
      : i
  ));
}

 // Increase product quantity
const increaseQty = async(id)=>{

  let item = cart.find(i=>i._id === id);

  if(!item) return;

  let updated = await updateCartQty(
    id,
    item.qty + 1,
    userId
  );

  if(!updated) return;

// Update state
  setCart(cart.map(i =>
    i._id === id
      ? { ...i, qty: updated.qty }
      : i
  ));
}



 // Remove item from cart
 const removeItem = async(id)=>{
await removeFromCart(id,userId);

  setCart(
    cart.filter(item=>item._id !== id)
  );

}
 // Calculate total amount
 const total = cart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);
  // Calculate total quantity
const totalItems = cart.reduce(
  (acc, item) => acc + item.qty,
  0
);

  return (
    <div className="bg-gray-100 p-4 sm:p-6 min-h-screen">
       {/* Page Heading */}
  <h1 className="text-2xl sm:text-3xl font-bold mb-6">
    Shopping Cart
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Cart Items */}
    <div className="md:col-span-2 bg-white rounded-xl p-4 sm:p-5 shadow">

      {cart.map((item) => (

        <div
          key={item._id}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b py-4 gap-4"
        >

          <div className="flex flex-col xs:flex-row gap-4 items-center sm:items-start">

            <Image
               src={item.images?.[0] || "/no-image.png"}

              className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover"
              alt={item.name}
                width={500}
  height={500}
            />

            <div className="text-center sm:text-left">
              <h2 className="font-bold">
                {item.name}
              </h2>

              <p>
                Rs {item.price}
              </p>
           {/* Quantity Controls */}
              <div className="flex gap-3 mt-2 justify-center sm:justify-start">

                <button
                  onClick={() => decreaseQty(item._id)}
                  className="bg-gray-200 px-3 rounded"
                >
                  -
                </button>

                <span>
                  {item.qty}
                </span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-gray-200 px-3 rounded"
                >
                  +
                </button>

              </div>
            </div>

          </div>
         {/* Quantity & Remove Button */}
          <div className="text-center sm:text-right">

            <p className="font-bold">
              Qty {item.qty}
            </p>

            <button
              onClick={() => removeItem(item._id)}
              className="text-red-500 mt-3"
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* Summary */}
    <div className="bg-white rounded-xl shadow p-5 h-fit">

      <h2 className="text-xl font-bold mb-4">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span> {total}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>$ {total}</span>
        </div>

      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded mt-5"
      >
        Checkout
      </button>

    </div>

  </div>
</div>
  );
};

export default Cart;
 

 