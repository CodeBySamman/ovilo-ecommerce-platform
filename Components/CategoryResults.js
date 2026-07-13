"use client";

import React, { useEffect, useState } from "react";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const CategoryResults = ({ category }) => {
  const [products, setProducts] = useState([]);
  
  // Logged in user session
  const { data: session } = useSession();

  // Fetch products on component mount
  useEffect(() => {
    getData();
  }, []);

  // Fetch all products from database
  const getData = async () => {
    const p = await fetchproduct();
    setProducts(p);
  };

  // Current logged in user id
  const userId = session?.user?._id;

  // Filter products by selected category
  const filteredProducts = products.filter(
    (item) => item.category?.toLowerCase() === category?.toLowerCase(),
  );

  // Add product to cart
  const addproduct = async (productId) => {
    try {
      await addToCart(productId, userId);

      Swal.fire({
        title: "Success!",
        text: "Product added to cart.",
        icon: "success",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add product.",
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      {/* Category Heading */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-800 capitalize">
        {category} Products
      </h1>

      {/* Show message if no products exist */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">No products found.</p>
      ) : (
        /* Products Grid */
        <div
          className="
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      gap-4
      sm:gap-5
      md:gap-6
      "
        >
          {filteredProducts.map((item) => (
            <div
              key={item._id}
              className="
          bg-white
          border
          rounded-xl
          shadow-sm
          hover:shadow-lg
          transition-all
          duration-300
          overflow-hidden
          flex
          flex-col
          h-full
          "
            >
              <Image
                src={item?.images?.[0] || item.images}
                alt={item.title}
                className="
            w-full
            h-48
            sm:h-52
            md:h-56
            lg:h-60
            object-cover
            "
              />

              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                {/* Product Title */}
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </h2>

                <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 gap-2">
                  <span className="text-indigo-600 font-bold text-base sm:text-lg whitespace-nowrap">
                    Rs {item.price}
                  </span>

                  <button
                    onClick={() => addproduct(item._id)}
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
      )}
    </div>
  );
};

export default CategoryResults;
