//Models
const { Order } = require("../models/order.model");

// Utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const orderExists = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const orders = await Order.findOne({ where: { id, userId: sessionUser.id } });

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
