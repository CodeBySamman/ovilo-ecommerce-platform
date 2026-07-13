"use client";
import React, { useEffect, useState } from "react";
import ModalProduct from "./ModalProduct";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Image from "next/image";

import {
  addProduct,
  fetchproduct,
  editproduct,
  DeleteProduct,
} from "@/app/action/useraction";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [editId, setEditId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //editproduct
  const onSubmit = async (data) => {
    // If editId exists then update existing product
    if (editId) {
      // Update product data using product id
      await editproduct(data, editId);

      Swal.fire({
        title: "Success!",
        text: "Product has been updated.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } else {
      // Add new product into database
      await addProduct(data);

      Swal.fire({
        title: "Success!",
        text: "Product has been added.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    }

    setOpen(false);
    setEditId(null);

    // clear modal
    reset();
    // update ui
    getData();
  };

  // fetchproduct
  let getData = async () => {
    let p = await fetchproduct();
    setProduct(p);
  };

  //update ui
  useEffect(() => {
    getData();
  }, []);

  // edit product through id
  let edithandler = async (current) => {
    setOpen(true);
    setEditId(current._id);
    reset({
      title: current.title,
      name: current.name,
      description: current.description,
      price: current.price,
      images: current.images,
      category: current.category,
      stock: current.stock,
    });
  };

  // delete function
  const delethandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    });

    if (result.isConfirmed) {
      await DeleteProduct(id);

      setProduct((prev) => {
        return prev.filter((item) => item._id !== id);
      });

      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="w-full flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Products
            </h1>

            <button
              className="
        w-full
        sm:w-auto
        text-sm
        font-semibold
        text-white
        bg-blue-600
        border
        border-blue-700
        py-2
        px-5
        rounded-lg
        hover:bg-blue-800
        transition
        "
              onClick={() => setOpen(!open)}
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-4
    sm:gap-6
    md:gap-8
    "
        >
          {product.map((item) => (
            <div
              key={item._id}
              className="
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-md
        hover:shadow-xl
        transition
        p-4
        sm:p-5
        flex
        flex-col
        h-full
        "
            >
              {/* Image */}
              <div className="w-full h-44 sm:h-52 md:h-56 overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.images?.[0] || "/no-image.png"}
                  alt={item.title}
                    width={500}
  height={500}
                  className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition
            duration-300
            "
                />
              </div>

              {/* Title */}
              <div className="mt-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
                  {item.title}
                </h2>
              </div>

              {/* Description */}
              <div className="mt-3 flex-grow">
                <h3 className="font-bold text-gray-700 text-sm sm:text-base">
                  Description
                </h3>

                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Details */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold">Name</span>
                  <span className="text-right break-words max-w-[60%]">
                    {item.name}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold">Category</span>
                  <span className="text-right break-words max-w-[60%]">
                    {item.category}
                  </span>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <span className="font-bold">Price</span>
                  <span className="font-semibold text-blue-600">
                    Rs {item.price}
                  </span>
                </div>
              </div>

              {/* Stock + Actions */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  In Stock {item.stock}
                </span>

                <div className="flex w-full sm:w-auto gap-2">
                  <button
                    className="
              flex-1
              sm:flex-none
              text-white
              px-3
              py-1
              bg-blue-600
              rounded
              text-sm
              font-bold
              "
                    onClick={() => edithandler(item)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => delethandler(item._id)}
                    className="
              flex-1
              sm:flex-none
              bg-red-500
              text-white
              px-3
              py-1
              rounded
              text-sm
              font-bold
              "
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ModalProduct
        open={open}
        editId={editId}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        setOpen={setOpen}
      />
    </>
  );
};

export default Products;
