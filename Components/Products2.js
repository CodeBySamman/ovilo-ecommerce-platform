"use client";
import React, { useEffect, useState } from "react";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const Products2 = () => {
  const [products, setProducts] = useState([]);

  //update ui
  useEffect(() => {
    getData();
  }, []);

  // fetchproduct all
  let getData = async () => {
    let p = await fetchproduct();
    setProducts(p);
  };

  const { data: session } = useSession();
  let userId = session?.user?._id;

  const showSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Product Has Been Added In Cart.",
      timer: 1500,
      icon: "success",
      showConfirmButton: false,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-800">
        Latest Products
      </h1>

      {/* Display all products */}
      <div
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    gap-4
    sm:gap-5
    md:gap-6
    "
      >
        {products?.map((item) => (
          <div
            key={item._id}
            className="
        bg-white
        border
        rounded-xl
        shadow-sm
        hover:shadow-md
        transition
        overflow-hidden
        flex
        flex-col
        h-full
        "
          >
            {/* Image */}
            <Image
              src={item.images}
              alt={item.title}
              className="
          h-44
          sm:h-48
          md:h-52
          lg:h-56
          w-full
          object-cover
          "
            />

            {/* Content */}
            <div className="p-3 sm:p-4 flex flex-col flex-grow">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h2>

              <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                {item.description}
              </p>

              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <span className="text-indigo-600 font-bold text-sm sm:text-base whitespace-nowrap">
                  ${item.price}
                </span>

                <button
                  onClick={() => {
                    addToCart(item._id, userId);
                    showSuccess();
                  }}
                  className="
              px-3
              sm:px-4
              py-2
              text-xs
              sm:text-sm
              bg-indigo-600
              text-white
              rounded-lg
              hover:bg-indigo-700
              transition
              whitespace-nowrap
              "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products2;
