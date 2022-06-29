
const express = require("express")
const { requireSignIn,checkAdmin } = require("../controllers/authController")
const { createOrder, getAllOrders ,getOrderById, updateOrder,cancelOrder} = require("../controllers/orderController")
const router = express.Router()

router.post("/v1/order",requireSignIn, createOrder)
router.get("/v1/order",requireSignIn, getOrderById)
router.get("/v1/orders",requireSignIn,checkAdmin, getAllOrders)
router.patch("/v1/order",requireSignIn,checkAdmin, updateOrder)
router.delete("/v1/order",requireSignIn,checkAdmin, cancelOrder)







module.exports = router