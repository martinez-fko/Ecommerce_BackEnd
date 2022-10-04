//Models
const { ProductInCart } = require('../models/productInCart.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const addProductCart = catchAsync(async (req, res, next) => {
  const { cart, product } = req;
  const { productId, quantity } = req.body;
  
  // if( product.quantity < quantity ){
  //   return next(new AppError('No existence of product', 404));
  // }

  const addProduct = await ProductInCart.create({
    cartId: cart.id,
    productId,
    quantity,
  });

  res.status(200).json({
    status: 'addProductCart',
    data: { addProduct },
  });
});
const updateCart = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'updateCart',
  });
});
const deleteProductCart = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'deleteProductCart',
  });
});
const purchaseCart = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'purchaseCart',
  });
});

module.exports = {
  addProductCart,
  updateCart,
  deleteProductCart,
  purchaseCart,
};
