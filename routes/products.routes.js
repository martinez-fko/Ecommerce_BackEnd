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

// Middleware
const {
  createCategoryValidators,
  createProductValidators,
} = require("../middlewares/validators.middlewares");

const productsRouter = express.Router();

productsRouter.get("/categories", getAllCategories);

// Protecting below endpoints
productsRouter.use(protectSession);

productsRouter.post("/categories", createCategoryValidators, createCategory);

productsRouter.post("/", createProductValidators, createProduct);

module.exports = { productsRouter };
