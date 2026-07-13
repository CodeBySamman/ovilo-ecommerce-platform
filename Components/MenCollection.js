"use client";
import React, { useEffect, useState } from "react";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const MenCollection = () => {
  const [product, setProduct] = useState([]);
  const { data: session } = useSession();

  let userId = session?.user?._id;

  // fetchproduct
  let m = async () => {
    let data = await fetchproduct();
    setProduct(data);
  };

  useEffect(() => {
    m();
  }, []);

  // Filter Men Product
  let mancollection = product.filter((item) => item.category === "men");

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
    <div>
      <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
            Men's Collection
          </h2>

          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        sm:gap-5
        md:gap-6
        "
          >
            {mancollection.map((item) => (
              <div
                key={item._id}
                className="
            relative
            h-[320px]
            sm:h-[380px]
            md:h-[420px]
            rounded-2xl
            overflow-hidden
            group
            "
              >
                <Image
                  src={item.images}
                  className="
              w-full
              h-full
              object-cover
              group-hover:scale-110
              transition
              duration-500
              "
                  alt={item.title}
                />

                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-5 md:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">
                    {item.title}
                  </h3>

                  <button
                    onClick={() => {
                      addToCart(item._id, userId);
                      showSuccess();
                    }}
                    className="mt-4 bg-white text-black px-5 py-2 rounded-full w-fit text-sm sm:text-base"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default MenCollection;
