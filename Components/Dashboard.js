"use client";
import React, { useEffect, useState } from "react";
import { fetchCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ModalProduct from "./ModalProduct";

import {
  fetchproduct,
  fetchOrders,
  addProduct,
  fetchUser,
} from "@/app/action/useraction";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();
  //fetchUser
  useEffect(() => {
    let u = async () => {
      let a = await fetchUser();
      setUser(a);
    };
    u();
  }, []);

  const customerCount = user.filter((item) => item.role === "user").length;

  // fetchOrders
  useEffect(() => {
    let ordr = async () => {
      let a = await fetchOrders();
      setOrder(a);
    };
    ordr();
  }, []);

  const {
    register,
    handleSubmit,
      reset,
    formState: { errors },
  } = useForm();

  let getData = async () => {
    let p = await fetchproduct();
    setProduct(p);
  };
  useEffect(() => {
    getData();
  }, []);

  // addProduct data
  const onSubmit = async (data) => {
    try {
      await addProduct(data);

      Swal.fire({
        title: "Success!",
        text: "Product has been added successfully.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });

      setOpen(false);
      reset()
      // Refresh product list
      getData();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add product.",
        icon: "error",
      });
    }
  };

  // Get current logged in user id
  const userId = session?.user?._id;

  // Fetch User Cart
  useEffect(() => {
    // Stop if user is not logged in
    if (!userId) return;

    // Fetch user's cart items
    const getData = async () => {
      let data = await fetchCart(userId);
      setCart(data);
    };
    getData();
  }, [userId]);

  // Calculate total cart amount
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Calculate total cart quantity
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex relative">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
       <aside
  className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-white p-5 transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  md:translate-x-0`}
>
          <h1 className="text-2xl font-bold mb-8">Shop Admin</h1>

          <ul className="flex flex-col space-y-4">
            <Link
              href="/admin/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="bg-slate-700 p-3 rounded-lg"
            >
              Dashboard
            </Link>

            <Link
              href="/admin/products"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-700 p-3 rounded-lg"
            >
              Products
            </Link>

            <Link
              href="/admin/orders2"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-700 p-3 rounded-lg"
            >
              Orders
            </Link>

            <Link
              href="/admin/customers"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-700 p-3 rounded-lg"
            >
              Customers
            </Link>

            <Link
              href="/admin/categories"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-700 p-3 rounded-lg"
            >
              Categories
            </Link>

            <Link
              href="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-700 p-3 rounded-lg"
            >
              Settings
            </Link>
          </ul>
        </aside>

        {/* Main */}
        <main className="flex-1 w-full p-4 md:p-6 md:ml-0">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden bg-slate-900 text-white p-2 rounded"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>

              <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg w-full sm:w-auto"
            >
              Add Product
            </button>
          </div>

          {/* Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500">Total Sales</p>
              <h1 className="text-3xl font-bold mt-2">${total}</h1>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500">Orders</p>
              <h1 className="text-3xl font-bold mt-2">{order.length}</h1>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500">Products</p>
              <h1 className="text-3xl font-bold mt-2">{product.length}</h1>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center">
              <p className="text-gray-500">Customers</p>
              <h1 className="text-3xl font-bold mt-2">{customerCount}</h1>
            </div>
          </div>

          {/* Recent Products */}

          <div className="bg-white mt-8 p-5 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-5">Recent Products</h2>

            <div className="overflow-x-auto">
              <table className="min-w-[700px] w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-3">Product</th>

                    <th className="py-3">Category</th>

                    <th className="py-3">Price</th>

                    <th className="py-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {product.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="py-3">{item.name}</td>

                      <td className="py-3">{item.category}</td>

                      <td className="py-3">${item.price}</td>

                      <td className="py-3">
                        <span className="bg-green-200 text-green-700 px-3 py-1 rounded">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <ModalProduct
        setOpen={setOpen}
        errors={errors}
        open={open}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
      />
    </>
  );
};

export default Dashboard;
