const express = require("express");

// Controllers
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/products.controller");

// auth
const { protectSession } = require("../middlewares/auth.middlewares");

const productsRouter = express.Router();

// Protecting below endpoints
productsRouter.use(protectSession);

productsRouter.post("/categories", createCategory);

productsRouter.post("/", createProduct);

module.exports = { productsRouter };
