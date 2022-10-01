// Models
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

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
  res.status(201).json({
    status: "createProduct",
    data: { newProduct },
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "getAllProducts",
  });
});
const getProductById = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "getProductById",
  });
});
const updateProduct = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "updateProduct",
  });
});
const deleteProduct = catchAsync(async (req, res, next) => {
  res.status(204).json({
    status: "deleteProduct",
  });
});

//* =========== Get all Categories =========
const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({ where: { status: "active" } });

  res.status(200).json({
    status: "getAllCategories",
    data: { categories },
  });
});

//* ============ Create New Category =========
const createCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  res.status(201).json({
    status: "success",
    data: { newCategory },
  });
});

//* =========== Update Category =========
const updateCategory = catchAsync(async (req, res, next) => {
  const { category } = req;

  res.status(200).json({
    status: "updateCategory",
    data: { category },
  });
});
const deleteCategory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "deleteCategory",
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
