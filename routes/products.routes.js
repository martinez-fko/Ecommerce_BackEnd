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
const {
  productExists,
  categoryExists,
} = require("../middlewares/products.middlewares");

const productsRouter = express.Router();

productsRouter.get("/categories", getAllCategories);

productsRouter.get("/" , getAllProducts)

// Protecting below endpoints
productsRouter.use(protectSession);

productsRouter.post("/categories", createCategoryValidators, createCategory);

productsRouter.patch("/categories/:id", categoryExists, updateCategory);

productsRouter.delete("/categories/:id", categoryExists, deleteCategory);

productsRouter.post("/", createProductValidators, createProduct);

productsRouter.patch("/:id", productExists, updateProduct);

module.exports = { productsRouter };
