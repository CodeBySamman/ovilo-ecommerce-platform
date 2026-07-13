"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OrderModal from "./OrderModal";
import { addOrder, fetchOrders, shipOrder } from "@/app/action/useraction";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const Orders = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState([]);
  let router = useRouter();
  const { data: session } = useSession();

  // Get logged in user's id and role from session
  const userId = session?.user?._id;
  const role = session?.user?.role;

  // React Hook Form setup for order form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch orders according to user role
  // Admin can see all orders, user can see only their own orders
  const ordr = async () => {
    // Stop function if user is not logged in
    if (!userId) return;

    // Fetch orders from database
    const a = await fetchOrders(userId, role);

    // Store orders in state
    setOrder(a);
  };

  // Load orders when user session is available
  useEffect(() => {
    if (!userId) return;
    ordr();
  }, [userId]);

  // Create new order
  const onSubmit = async (data) => {
    try {
      await addOrder({
        userId,
        total: data.total,
        name: data.name,
        status: data.status || "pending",
        products: Array.isArray(data.products) ? data.products : [],
      });

      Swal.fire({
        title: "Success!",
        text: "Order has been created successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setOpen(false);
      reset();
      ordr();
    } catch (error) {
      // Error notification
      Swal.fire({
        title: "Error!",
        text: "Failed to create order.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="bg-gray-100 p-3 sm:p-4 md:p-6">
        {/* Header */}
        <button
          className="
      bg-blue-600
      rounded-sm
      px-3
      sm:px-4
      py-2
      text-white
      text-lg
      sm:text-2xl
      md:text-3xl
      font-bold
      mb-4
      sm:mb-6
      cursor-pointer
      "
          onClick={() => setOpen(true)}
        >
          + Create Order
        </button>

        {/* Table */}
        <div className="bg-white p-3 sm:p-5 rounded-xl shadow overflow-x-auto">
          <table className="min-w-[800px] w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2 sm:p-3">Order ID</th>
                <th className="p-2 sm:p-3">Customer</th>
                <th className="p-2 sm:p-3">Total</th>
                <th className="p-2 sm:p-3">Status</th>
                <th className="p-2 sm:p-3">Date</th>
                <th className="p-2 sm:p-3">Action</th>
              </tr>
            </thead>

            {/* Display Data */}
            <tbody>
              {order.map((item) => (
                <tr className="border-b" key={item._id}>
                  <td className="p-2 sm:p-3 text-sm sm:text-base whitespace-nowrap">
                    #{item.orderId}
                  </td>

                  <td className="p-2 sm:p-3 text-sm sm:text-base">
                    {item.name}
                  </td>

                  <td className="p-2 sm:p-3 text-sm sm:text-base whitespace-nowrap">
                    ${item.total}
                  </td>

                  <td className="p-2 sm:p-3">
                    <span
                      className="
                  bg-yellow-200
                  text-yellow-700
                  px-2
                  sm:px-3
                  py-1
                  rounded
                  text-xs
                  sm:text-sm
                  whitespace-nowrap
                  "
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="p-2 sm:p-3 text-sm sm:text-base whitespace-nowrap">
                    {format(new Date(item.createdAt), "dd-MM-yyyy")}
                  </td>

                  <td className="p-2 sm:p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/orders/${item.userId}`}
                        className="
                    bg-blue-500
                    text-white
                    px-3
                    py-1
                    rounded
                    text-sm
                    "
                      >
                        View
                      </Link>

                      <button
                        onClick={async () => {
                          await shipOrder(item._id);
                          ordr();
                        }}
                        className="
                    bg-green-600
                    text-white
                    px-3
                    py-1
                    rounded
                    text-sm
                    "
                      >
                        Ship
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <OrderModal
        setOpen={setOpen}
        open={open}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      />
    </div>
  );
};

export default Orders;
