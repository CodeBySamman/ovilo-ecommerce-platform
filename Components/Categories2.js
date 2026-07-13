"use client";

import React, { useEffect, useState } from "react";
import { fetchproduct } from "@/app/action/useraction";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Categories2() {
  const [product, setProduct] = useState([]);
  const router = useRouter();

  // fetchproduct
  useEffect(() => {
    const getData = async () => {
      let data = await fetchproduct();
      setProduct(data);
    };

    getData();
  }, []);

  return (
    <section className="bg-gray-100 py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-5 sm:mb-6 md:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
            Shop By Category
          </h2>
        </div>

        {/* Display Data */}
        <div
          className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      lg:grid-cols-5
      xl:grid-cols-6
      gap-3
      sm:gap-4
      md:gap-5
      lg:gap-6
      "
        >
          {product.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/${item.category}`)}
              className="
          group
          bg-white
          rounded-xl
          sm:rounded-2xl
          overflow-hidden
          shadow-md
          hover:shadow-xl
          transition-all
          duration-300
          cursor-pointer
          "
            >
              {/* Image */}
              <div
                className="
            h-28
            sm:h-36
            md:h-40
            lg:h-44
            xl:h-48
            overflow-hidden
            bg-gray-200
            "
              >
                <Image
                  src={item.images}
                  alt={item.title}
                  className="
              w-full
              h-full
              object-cover
              group-hover:scale-110
              transition-transform
              duration-500
              "
                />
              </div>

              {/* Content */}
              <div className="p-2 sm:p-3 md:p-4 text-center">
                <h3
                  className="
              text-sm
              sm:text-base
              md:text-lg
              font-semibold
              text-gray-800
              group-hover:text-black
              line-clamp-2
              min-h-[40px]
              "
                >
                  {item.title}
                </h3>

                <p
                  className="
              text-[10px]
              sm:text-xs
              md:text-sm
              text-blue-500
              font-bold
              mt-2
              sm:mt-3
              "
                >
                  View Collection
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
