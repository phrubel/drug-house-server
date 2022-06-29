const Order = require("../models/order");
var _ = require("lodash");


exports.createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    // const { productId, title, mainPrice, discount, quantity, status } =
    //   req.body;
    if (!_id)
      return res.status(400).json({ error: "Please Logout then log in." });

    const newOrder = new Order({
      user: _id,
      items:req.body.items,
      cartTotal:req.body.cartTotal
    });
    newOrder.save((err, or) => {
      console.log(err);
      if (err) return res.status(400).json({ error: "Try Again." });
      return res.status(201).json({ message: "Order Submited." });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Something wrong, Try again." });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "pharmacyName name number")
      .populate("productId", "title companyName productImage");
    res.status(200).json(orders);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something wrong, Try later." });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { _id } = req.user;
    const myOrder = await Order.find({ user: _id });
    res.status(200).json(myOrder);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something wrong, Try later." });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (!_id) return res.status(400).json({ error: "Invalid Product" });

    const order = await Order.findById(_id);
    if (!order) return res.status(400).json({ error: "Invalid Order" });
    const updatedOrder = _.extend(order, { status: status });
    updatedOrder.save((err, order) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(201).json({
        message: "Product Updated.",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something wrong, Try later." });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: "Invalid Action" });
    const deletOrder = await Order.findByIdAndRemove(_id);
    res.status(201).json({
      message: "order Cancel Successfully.",
    });
  } catch (e) {
    res.status(500).json({ error: "Something wrong, Try later." });
  }
};
