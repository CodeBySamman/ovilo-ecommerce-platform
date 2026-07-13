"use client";
import { fetchproduct, addToCart } from "@/app/action/useraction";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

export default function Deals() {
  const [product, setProduct] = useState([]);
  const { data: session } = useSession();

  let userId = session?.user?._id;

  // Fetch Deals Product
  let pro = async () => {
    let a = await fetchproduct();
    setProduct(a);
  };

  // update ui
  useEffect(() => {
    pro();
  }, []);

  const showSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Product Has Been Added In Cart.",
      timer: 1000,
      icon: "success",
      showConfirmButton: false,
    });
  };

  let dealproduct = product.filter((item) => item.isDeal);
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">
        🔥 Today's Deals
      </h1>

      <div
        className="
    max-w-7xl
    mx-auto
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    gap-5
    sm:gap-6
    lg:gap-8
    "
      >
        {dealproduct.map((deal) => (
          <div
            key={deal._id}
            className="
        bg-white
        rounded-2xl
        shadow-lg
        overflow-hidden
        hover:scale-105
        transition
        duration-300
        h-full
        flex
        flex-col
        "
          >
            <Image
                src={deal.images?.[0] || "/no-image.png"}

                width={500}
  height={500}
              className="
          w-full
          h-52
          sm:h-60
          md:h-64
          object-cover
          "
              alt={deal.title}
            />

            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
              <h2 className="text-xl sm:text-2xl font-bold">{deal.title}</h2>

              <p className="text-red-500 text-2xl sm:text-3xl font-bold mt-3">
                {deal.discount}% Discount
              </p>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Limited time offer. Grab it now!
              </p>

              <button
                onClick={() => {
                  addToCart(deal._id, userId);
                  showSuccess();
                }}
                className="
            mt-auto
            pt-5
            w-full
            bg-black
            text-white
            py-3
            rounded-xl
            hover:bg-gray-800
            "
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
