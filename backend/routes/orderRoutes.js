const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrdertoPaid,
  getMyOrders,
  getOrders,
  updateOrdertoDelivered,
} = require("../controllers/orderController.js");
const { protect, isAdmin } = require("../middleware/authMiddleware");
router.route("/").get(protect, isAdmin, getOrders).post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrdertoPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrdertoDelivered);
module.exports = router;
