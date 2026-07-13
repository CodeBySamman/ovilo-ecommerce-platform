"use client";

import React, { useEffect, useState } from "react";
import { customerfind } from "@/app/action/useraction";

const CustomerDetail = ({ name }) => {
  const [customer, setCustomer] = useState([]);

  // Fetch customer by name
  useEffect(() => {
    if (name) {
      loadOrders();
    }
  }, [name]);

  const loadOrders = async () => {
    let data = await customerfind(name);
    setCustomer(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
        Customer Detail
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {customer.map((item) => (
          <div
            key={item._id}
            className="
        bg-white
        rounded-xl
        shadow-md
        p-4
        sm:p-5
        md:p-6
        hover:shadow-xl
        transition
        h-full
        "
          >
            <div className="space-y-4 text-gray-700">
              {/* Name section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h2 className="font-bold min-w-[80px]">Name:</h2>

                <p className="break-words">{item.name}</p>
              </div>

              {/* Email SECTION */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h2 className="font-bold min-w-[80px]">Email:</h2>

                <p className="break-all">{item.email}</p>
              </div>

              {/* Status admin or user */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h2 className="font-bold min-w-[80px]">Status:</h2>

                <p className="break-words">{item.role}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <h2 className="font-bold min-w-[80px]">Date:</h2>

                <p className="break-words">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDetail;
