"use client";

import { useForm } from "react-hook-form";
import { updateHome, fetchproduct } from "@/app/action/useraction";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Settings = () => {
  const router = useRouter();
  const [product, setProduct] = useState([]);

  // React Hook Form setup for handling home page form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch all products to show in featured products section
  // Update product list in UI
  useEffect(() => {
    const pro = async () => {
      // Fetch products from database
      let p = await fetchproduct();

      // Store products in state
      setProduct(p);
    };
    pro();
  }, []);

  // Update Home Page Settings
  const onSubmit = async (data) => {
    try {
      // Send updated home page data to server
      await updateHome({
        // Keep all form data
        ...data,
        featuredProducts: data.featuredProducts || [],
      });

      await Swal.fire({
        title: "Success!",
        text: "Home page updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Redirect user to home page
      router.push("/");
      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update home page.",
        icon: "error",
      });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
  bg-white
  p-4
  sm:p-6
  rounded-xl
  shadow
  max-w-5xl
  mx-auto
  "
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Home Page Settings
      </h2>

      {/* Banner Image */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Banner Image</label>

        <input
          {...register("BannerImage", { required: true })}
          className="border p-3 w-full rounded"
        />

        {errors.BannerImage && (
          <p className="text-red-500 text-sm mt-1">Image required</p>
        )}
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Title</label>

        <input
          {...register("title", { required: true })}
          className="border p-3 w-full rounded"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Description</label>

        <input
          {...register("description", { required: true })}
          className="border p-3 w-full rounded"
        />
      </div>

      {/* Button Text */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Button Text</label>

        <input
          {...register("buttonText", { required: true })}
          className="border p-3 w-full rounded"
        />
      </div>

      {/* Featured Products */}
      <label className="block text-xl sm:text-2xl font-bold mt-6 mb-4">
        Featured Products
      </label>

      <div
        className="
    border
    rounded-lg
    p-3
    max-h-72
    overflow-y-auto
    "
      >
        {product.map((item) => (
          <div key={item._id} className="py-2 border-b last:border-b-0">
            <label className="flex gap-3 items-center text-sm sm:text-base">
              <input
                type="checkbox"
                value={item._id}
                {...register("featuredProducts")}
              />
              <span className="break-words">{item.name}</span>
            </label>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        className="
    mt-6
    w-full
    sm:w-auto
    bg-indigo-600
    hover:bg-indigo-700
    text-white
    px-6
    py-3
    rounded
    font-medium
    transition
    "
      >
        Save
      </button>
    </form>
  );
};

export default Settings;
