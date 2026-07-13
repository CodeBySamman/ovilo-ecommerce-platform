"use client";
import React, { useEffect, useState } from "react";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const ShoesCollection = () => {
  const [product, setProduct] = useState([]);
  const { data: session } = useSession();

  let userId = session?.user?._id;

  //fetchproduct
  let m = async () => {
    let data = await fetchproduct();
    setProduct(data);
  };

  //update ui
  useEffect(() => {
    m();
  }, []);

  const showSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Product Has Been Added In Cart.",
      timer: 1500,
      icon: "success",
      showConfirmButton: false,
    });
  };
  let shoesCollection = product.filter((item) => item.category === "shoes");

  return (
    <div>
      <section className="py-10 sm:py-12 md:py-16 px-3 sm:px-5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">
            Shoes Collection
          </h2>

          {/* return array */}
          <div
            className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        sm:gap-6
        "
          >
            {shoesCollection.map((item) => (
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
                 src={item.images?.[0] || "/no-image.png"}
                  alt={item.title}
                    width={500}
  height={500}
                  className="
              w-full
              h-full
              object-cover
              group-hover:scale-110
              transition
              duration-500
              "
                />

                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-6">
                  <h3 className="text-white text-xl sm:text-2xl font-bold line-clamp-2">
                    {item.title}
                  </h3>

                  <button
                    onClick={() => {
                      addToCart(item._id, userId);
                      showSuccess();
                    }}
                    className="
                mt-4
                bg-white
                text-black
                px-4
                sm:px-5
                py-2
                rounded-full
                w-fit
                text-sm
                sm:text-base
                "
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
export default ShoesCollection;
