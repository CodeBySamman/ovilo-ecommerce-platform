"use client";

import React, { useEffect, useState } from "react";
import { getUserOrders } from "@/app/action/useraction";

const OrderDetail = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  // update UI
  useEffect(() => {
    if (userId) {
      loadOrders();
    }
  }, [userId]);

  // getUserOrders
  const loadOrders = async () => {
    let data = await getUserOrders(userId);
    setOrders(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
        Customer Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-4 sm:p-6 text-center">
          No Orders Found
        </div>
      ) : (
        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-4
      sm:gap-6
      "
        >
          {orders.map((order) => (
            <div
              key={order._id}
              className="
          bg-white
          rounded-xl
          shadow-md
          p-4
          sm:p-5
          md:p-6
          hover:shadow-xl
          transition
          "
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                {/* orderId  */}
                <h2 className="text-lg sm:text-xl font-bold break-all">
                  Order #{order.orderId}
                </h2>

                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs sm:text-sm w-fit">
                  {order.status}
                </span>
              </div>

              <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                {/* name */}
                <p className="break-words">
                  <b>Customer:</b> {order.name}
                </p>

                <p>
                  <b>Total:</b> ${order.total}
                </p>

                <p>
                  <b>Date:</b> {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-5 border-t pt-4">
                <h3 className="font-semibold mb-3">Products</h3>

                <div className="space-y-2">
                  {order.products?.map((item, index) => (
                    <div
                      key={index}
                      className="
                  flex
                  flex-col
                  sm:flex-row
                  sm:justify-between
                  gap-2
                  bg-gray-50
                  p-3
                  rounded
                  "
                    >
                      <span className="break-words">
                        {item.productId?.title || "Product"}
                      </span>

                      <span className="whitespace-nowrap">Qty: {item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
