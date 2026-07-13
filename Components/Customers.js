"use client"
import React, { useEffect, useState } from 'react';
import {  format } from "date-fns";
import { blockUser, fetchUser } from '@/app/action/useraction';
import Link from 'next/link';

const Customers = () => {
  const [user, setUser] = useState([]);

  // Fetch user
  let u = async()=>{
    let a = await fetchUser()
      setUser(a)
    
  }

  useEffect(() => {
   u()
  }, []);

  return (
  <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">

  {/* Header */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
    Customers
  </h1>

  {/* Table */}
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow">

    <div className="overflow-x-auto">

      <table className="w-full min-w-[850px]">

        <thead>
          <tr className="border-b text-left">

            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Joined Date</th>
            <th className="p-3">Action</th>

          </tr>
        </thead>

         {/* Display Data */}
        <tbody>
            {user.map((item) => (

            <tr className="border-b" key={item._id}>

              <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                {item.name}
              </td>

              <td className="p-3 text-sm sm:text-base break-all">
                {item.email}
              </td>

              <td className="p-3">
                <span className="bg-blue-200 text-blue-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm whitespace-nowrap">
                  {item.role}
                </span>
              </td>

              <td className="p-3 text-sm sm:text-base whitespace-nowrap">
                {format(
                  new Date(item.createdAt),
                  "dd-MM-yyyy"
                )}
              </td>

              <td className="p-3">
                <div className="flex flex-wrap gap-2">

                  <Link
                    href={`/admin/customer/${item.name}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                  >
                    View
                  </Link>

                  <button
                    onClick={async () => {
                      await blockUser(item._id);
                      u();
                    }}
                    className={`${
                      item.status === "blocked"
                        ? "bg-black cursor-not-allowed"
                        : "bg-red-500"
                    } text-white px-3 py-1 rounded text-sm whitespace-nowrap`}
                  >
                    {item.status}
                  </button>

                </div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>
);
}

export default Customers;
