const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler"); //used to avoid writing try catch in async await call

// @desc  Fetch all products
//@route GET /api/products/
//@access public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10; //static page size means how many items you want in 1 page
  const page = Number(req.query.pageNumber) || 1; //currently on which page number it is

  const keyword =
    req.query.keyword && req.query.keyword !== "undefined"
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
  const countProducts = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(countProducts / pageSize) });
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

// @desc  delete product by id
//@route DELETE /api/products/:id
//@access private/admin
const deleteProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    const err = new Error("Product not found");
    err.status = 404;
    throw err; //jo bhi error throw kroge that will catch by our error handler middleware
  }
});

// @desc  Create a Product
//@route POST /api/products
//@access private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    description: "Sample Description",
    countInStock: 0,
    numReviews: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc Update a Product
//@route PUT /api/products
//@access private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create new Review
//@route POST /api/products/:id/reviews
//@access private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed by you");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    }
    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Get Top rated products
//@route Get /api/products/top
//@access public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

module.exports = {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
