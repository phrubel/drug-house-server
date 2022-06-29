const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
    },
    mainPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    hide: {
      type: Boolean,
    },
    sellType: {
      type: String,
      enum: ["flash", "recent", "tranding"],
      default: "recent",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
