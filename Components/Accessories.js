"use client";
import React, { useEffect, useState } from "react";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const Accessories = () => {
  const [product, setProduct] = useState([]);
  const { data: session } = useSession();
  let userId = session?.user?._id;

  // Fetchproduct
  let m = async () => {
    let data = await fetchproduct();
    setProduct(data);
  };

  // useEffect
  useEffect(() => {
    m();
  }, []);

  const showSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Product Has Been Added In Cart.",
      timer: 1300,
      icon: "success",
      showConfirmButton: false,
    });
  };
  let accessories = product.filter((item) => item.category === "accessories");

  return (
    <div>
      <section className="py-12 sm:py-16 px-4 sm:px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
            Accessories Collection
          </h2>

          {/* Display Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {accessories.map((item) => (
              <div
                key={item._id}
                className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={item.images?.[0] || "/no-image.png"}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  alt={item.title}
                    width={500}
  height={500}
                />

                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold">
                    {item.title}
                  </h3>

                  {/* addToCart button */}
                  <button
                    onClick={() => {
                      addToCart(item._id, userId);
                      showSuccess();
                    }}
                    className="mt-3 sm:mt-4 bg-white text-black px-4 sm:px-5 py-2 rounded-full w-fit text-sm sm:text-base"
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
export default Accessories;
