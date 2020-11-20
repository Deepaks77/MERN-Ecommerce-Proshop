const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProductById,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProductById)
  .put(protect, isAdmin, updateProduct);

module.exports = router;
