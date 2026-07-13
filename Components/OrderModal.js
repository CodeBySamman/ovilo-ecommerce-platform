"use client";
import React from "react";

const OrderModal = ({
  open,
  onSubmit,
  handleSubmit,
  register,
  errors,
  setOpen,
}) => {
  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
    fixed
    inset-0
    bg-black/50
    flex
    items-center
    justify-center
    z-50
    p-3
    sm:p-4
    "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
      bg-white
      w-full
      max-w-[95%]
      sm:max-w-lg
      md:max-w-xl
      lg:max-w-2xl
      xl:max-w-3xl
      rounded-lg
      shadow-lg
      p-4
      sm:p-6
      max-h-[90vh]
      overflow-y-auto
      "
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
              Add Order
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                {/* total */}
                <input
                  {...register("total", { required: true })}
                  type="number"
                  placeholder="Enter Total"
                  className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                />
                {errors.total && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                {/* name */}

                <input
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div>
                {/* status */}
                <input
                  {...register("status", { required: true })}
                  placeholder="Status"
                  className="w-full border p-2 sm:p-3 rounded text-sm sm:text-base"
                />
                {errors.status && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="
          w-full
          bg-blue-600
          text-white
          p-3
          rounded
          hover:bg-blue-700
          transition
          text-sm
          sm:text-base
          "
              >
                Add Order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderModal;
