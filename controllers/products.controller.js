// Models
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");


const createProduct = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "createProduct",
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
const getAllCategories = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "getAllCategories",
  });
});
const createCategory = catchAsync(async (req, res, next) => {
  res.status(201).json({
    status: "createCategory",
  });
});
const updateCategory = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "updateCategory",
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
