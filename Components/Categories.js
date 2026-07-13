"use client";
import React, { useEffect, useState } from "react";
import {
  fetchproduct,
  DeleteProduct,
  editproduct,
} from "@/app/action/useraction";
import ModalProduct from "./ModalProduct";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Swal from "sweetalert2";

const Categories = () => {
  const [product, setProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Update product
  const onSubmit = async (data) => {
    await editproduct(data, editId);
    setOpen(false);
    setEditId(null);

    // Clear form
    reset();
    // Refresh products
    getData();
  };
  // fetchproduct
  let getData = async () => {
    let p = await fetchproduct();
    setProduct(p);
  };

  // Load products on first render
  useEffect(() => {
    getData();
  }, []);

  // Delete product
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

      // Remove deleted product from state
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

  // Open edit modal and fill form with current product data
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

  return (
    <div>
      <div className="bg-gray-100 p-4 sm:p-6">
        {/* Categories List */}
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            All Categories
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              {/* Display Data */}
              <thead>
                <tr className="border-b text-left">
                  <th className="p-2 sm:p-3">Name</th>
                  <th className="p-2 sm:p-3">Category</th>
                  <th className="p-2 sm:p-3">Created At</th>
                  <th className="p-2 sm:p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {product.map((item) => (
                  <tr className="border-b" key={item._id}>
                    <td className="p-2 sm:p-3">{item.name}</td>

                    {/* category */}
                    <td className="p-2 sm:p-3">{item.category}</td>

                    <td className="p-2 sm:p-3 whitespace-nowrap">
                      {format(new Date(item.createdAt), "dd-MM-yyyy")}
                    </td>

                    <td className="p-2 sm:p-3">
                      <div className="flex flex-wrap gap-2">
                        {/* Edit button */}
                        <button
                          onClick={() => edithandler(item)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => delethandler(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
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

      {/* import ModalProduct */}
      <ModalProduct
        editId={editId}
        onSubmit={onSubmit}
        register={register}
        handleSubmit={handleSubmit}
        open={open}
        setOpen={setOpen}
        errors={errors}
      />
    </div>
  );
};

export default Categories;
