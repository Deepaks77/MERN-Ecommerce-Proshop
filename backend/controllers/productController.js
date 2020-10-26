const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler"); //used to avoid writing try catch in async await call

// @desc  Fetch all products
//@route GET /api/products/
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc  Fetch single products
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    const err = new Error("Product not found");
    err.status = 404;
    throw err; //jo bhi error throw kroge that will catch by our error handler middleware
  }
});

module.exports = {
  getProducts,
  getProductById,
};
