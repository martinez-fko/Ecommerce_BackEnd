// Models
const { Product } = require('../models/product.model');
const { Category } = require('../models/category.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { uploadProductsImgs } = require('../utils/firabase.util');

//* =========== Create new Product =========
const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity, categoryId } = req.body;
  const { sessionUser } = req;

  const newProduct = await Product.create({
    title,
    description,
    price,
    quantity,
    categoryId,
    userId: sessionUser.id,
  });

  await uploadProductsImgs(req.files, newProduct.id);

  res.status(201).json({
    status: 'success',
    data: { newProduct },
  });
});

//* =========== Get All Products =========
const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({ where: { status: 'active' } });
  res.status(200).json({
    status: 'success',
    data: { products },
  });
});

//* ===========  Get Product by Id =========
const getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

//* ========== Update Product =========
const updateProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity } = req.body;
  const { product } = req;

  await product.update({ title, description, price, quantity });

  res.status(200).json({
    status: 'success',
    data: { product },
  });
});

//* ========== Delete Product ========
const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'deleted' });
  res.status(204).json({
    status: 'success',
  });
});

//* =========== Get all Categories =========
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({ where: { status: 'active' } });

  res.status(200).json({
    status: 'success',
    data: { categories },
  });
});

//* ============ Create New Category =========
const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  res.status(201).json({
    status: 'success',
    data: { newCategory },
  });
});

//* =========== Update Category =========
const updateCategory = catchAsync(async (req, res, next) => {
  const { category } = req;
  const { name } = req.body;

  await category.update({ name });

  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

//* =========== Delete Category =========
const deleteCategory = catchAsync(async (req, res, next) => {
  const { category } = req;

  await category.update({ status: 'deleted' });

  res.status(204).json({
    status: 'success',
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
