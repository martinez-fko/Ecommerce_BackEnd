//Models
const { Order } = require("../models/order.model");
const { Cart } = require("../models/cart.model");
const { ProductInCart } = require("../models/productInCart.model");
const { Product } = require("../models/product.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const orderExists = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const orders = await Order.findOne({
    where: {
      id,
      userId: sessionUser.id,
    },
    include: {
      model: Cart,
      include: { model: ProductInCart, include: { model: Product } },
    },
  });

  // If order doesn't exist, send error message
  if (!orders) {
    return next(new AppError("Order not found", 404));
  }

  req.orders = orders;
  next();
});

module.exports = {
  orderExists,
};
