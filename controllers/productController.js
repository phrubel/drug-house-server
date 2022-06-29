const Products = require("../models/productModel");

exports.createProductController = async (req, res) => {
  try {
    const {
      title,
      companyName,
      discount,
      mainPrice,
      stock,
      productImage,
      hide,
      sellType,
    } = req.body;

    if (
      (!title,
      !companyName,
      !discount,
      !mainPrice,
      !stock,
      !productImage,
      !sellType)
    )
      return res.status(400).json({ error: "Fill all fild" });

    const exestProduct = await Products.findOne({ title });
    if (exestProduct)
      return res.status(400).json({ error: "Product alredy listed" });

    const newProduct = new Products({
      title,
      companyName,
      discount,
      mainPrice,
      stock,
      productImage,
      sellType,
      hide,
    });

    newProduct.save((err, product) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "Fail to save!" });
      }
      res.status(201).json({
        message: "New Product Listed Successfully",
      });
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Some thing went wrong!" });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const products = await Products.find({});
    products.reverse();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ error: "Please try again!" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      _id,
      title,
      companyName,
      discount,
      mainPrice,
      stock,
      productImage,
    } = req.body;
    if (
      (!_id, !title, !companyName, !discount, !mainPrice, !stock, !productImage)
    )
      return res.status(400).json({ error: "Please Try Again!" });
    const product = await Products.findByIdAndUpdate(_id, req.body);
    res.status(201).json({ message: "Product updated" });
  } catch (e) {
    res.status(400).json({ error: "Please try again!" });
  }
};

exports.deletProduct = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: "Please Try Again!" });
    const product = await Products.findById(_id);
    if (!product) return res.status(400).json({ error: "Product Not Exits!" });
    await product.remove();
    const products = await Products.find({});
    res.status(201).json({ message: "Product deleted successfully", products });
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: "Please try again!" });
  }
};
