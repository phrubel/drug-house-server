const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      companyName: {
        type: String,
        required: true,
      },
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      mainPrice: {
        type: Number,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
     
      price: {
        type: Number,
        required: true,
      }
    },
  ],
  status: {
    type: String,
    enum: ["Delivered", "On Going", "Return"],
    default: "On Going",
  },
  cartTotal: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
}, {timestamps : true});

module.exports = mongoose.model("Order", orderSchema);
