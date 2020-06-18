const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { findUserById } = require("../controllers/user");
const {
  getProductById,
  getProduct,
  createProduct,
  photo,
  updateProduct,
  removeProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");

//params
router.param("userId", findUserById);
router.param("productId", getProductById);

//read actual routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//update
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
  );

//delete
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

//listing route
router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;
