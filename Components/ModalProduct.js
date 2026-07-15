"use client";
import React from "react";

const ModalProduct = ({
  open,
  editId,
  onSubmit,
  handleSubmit,
  register,
  errors,
  setOpen,
}) => {
  return (
    <>
      <div className="scroll-auto ">
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed  inset-0 bg-black/50 flex items-center justify-center z-[9999] p-3 sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
        bg-white
        w-full
        max-w-2xl
        p-4
        sm:p-6
        rounded-lg
        shadow-lg
        max-h-[90vh]
        overflow-y-auto
        "
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
                Add Product
              </h2>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* images */}
                <input
                  {...register("images", { required: true })}
                  type="text"
                  placeholder="Image URLs"
                  className="w-full border p-2 rounded text-sm sm:text-base"
                />
                {errors.images && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* title */}
                <input
                  {...register("title", { required: true })}
                  type="text"
                  placeholder="Product Title"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* description */}
                <textarea
                  {...register("description", { required: true })}
                  placeholder="description"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.description && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* name */}
                <input
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* price */}
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.price && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* category */}
                <input
                  {...register("category", { required: true })}
                  type="text"
                  placeholder="Category"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.category && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* salePrice */}
                <input
                  {...register("salePrice")}
                  type="number"
                  placeholder="salePrice"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.salePrice && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* discount */}
                <input
                  {...register("discount")}
                  type="number"
                  placeholder="discount"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.discount && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* stock */}
                <input
                  {...register("stock")}
                  type="number"
                  placeholder="stock"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.stock && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* status */}
                <input
                  {...register("status", { required: true })}
                  placeholder="status"
                  className="w-full border p-2 rounded mt-4 text-sm sm:text-base"
                />
                {errors.status && (
                  <span className="text-red-500">This field is required</span>
                )}

                {/* isdeal */}
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" {...register("isDeal")} />
                  <label>Deal Product</label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 text-white p-2 sm:p-3 rounded hover:bg-blue-700"
                >
                  {editId ? "Update Product" : "Add Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalProduct;
