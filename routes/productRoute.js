const express = require("express");
const { requireSignIn, checkAdmin } = require("../controllers/authController");
const { createProductController, getAllProduct,updateProduct,deletProduct } = require("../controllers/productController");
const router = express.Router();

router.post(
  "/v1/create-product",
  requireSignIn,
  checkAdmin,
  createProductController
);
router.patch(
  "/v1/update-product",
  requireSignIn,
  checkAdmin,
  updateProduct
);
router.delete(
  "/v1/delet-product",
  requireSignIn,
  checkAdmin,
  deletProduct
);
router.get(
  "/v1/get-product",
  requireSignIn,
getAllProduct
);

module.exports = router;
