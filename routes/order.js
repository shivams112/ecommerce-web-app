const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  findUserById,
  pushOrderInPurchaseList,
} = require("../controllers/user");
const { updateStockAndSold } = require("../controllers/product");

const { getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus } = require("../controllers/order");

//params
router.param("userId", findUserById);
router.param("orderId", getOrderById);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStockAndSold,
  createOrder
);

//status of order
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus)
router.put("/order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus)

module.exports = router;
