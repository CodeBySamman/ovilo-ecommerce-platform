import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     
    },

  orderId:{
    type:String,
    unique:true,
    required:true
  },
    total: {
      type: Number,
    },

    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "done",
 
 "processing",
 "shipped",
 "delivered",
 "cancelled"],

      default: "pending",
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;