import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "home",
      unique: true,
      index: true,
    },
    BannerImage: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
 description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },

    featuredProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true },
);

const HomeSettings =mongoose.models.HomeSettings || mongoose.model("HomeSettings", HomeSchema);

export default HomeSettings;
