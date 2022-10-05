const express = require('express');

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
} = require('../controllers/products.controller');

// auth
const {
  protectSession,
  protectProductsOwners,
} = require('../middlewares/auth.middlewares');

// Middleware
const {
  createCategoryValidators,
  createProductValidators,
} = require('../middlewares/validators.middlewares');

const {
  productExists,
  categoryExists,
} = require('../middlewares/products.middlewares');

// Utils
const { upload } = require('../utils/multer.util');

const productsRouter = express.Router();

productsRouter.get('/categories', getAllCategories);

productsRouter.get('/', getAllProducts);

productsRouter.get('/:id', productExists, getProductById);

// Protecting below endpoints
productsRouter.use(protectSession);

productsRouter.post('/categories', createCategoryValidators, createCategory);

productsRouter.patch('/categories/:id', categoryExists, updateCategory);

productsRouter.delete('/categories/:id', categoryExists, deleteCategory);

productsRouter.post('/', upload.array('productImg', 5), createProductValidators, createProduct);

productsRouter.patch(
  '/:id',
  productExists,
  protectProductsOwners,
  updateProduct
);

productsRouter.delete(
  '/:id',
  productExists,
  protectProductsOwners,
  deleteProduct
);

module.exports = { productsRouter };
