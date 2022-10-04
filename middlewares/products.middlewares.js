// Models
const { Product } = require("../models/product.model");
const { Category } = require("../models/category.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const productExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: { id, status: "active" },
    include: { model: Category }
  });

  // If product doesn't exist, send error message
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // req.anyPropName = 'anyValue'
  req.product = product;
  next();
});

const categoryExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category = await Category.findOne({
    where: { id, status: "active" },
  });

  // If category doesn't exist, send error message
  if (!category) {
    return next(new AppError("Category not found", 404));
  }

  // req.anyPropName = 'anyValue'
  req.category = category;
  next();
});

module.exports = {
  productExists,
  categoryExists,
};
