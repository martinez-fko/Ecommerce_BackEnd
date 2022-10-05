//Models
const { ProductInCart } = require('../models/productInCart.model');
const { Product } = require('../models/product.model');
const { Cart } = require('../models/cart.model');
const { Order } = require('../models/order.model');
// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

//* ========== Add Product in Cart =========
const addProductCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId, quantity } = req.body;

  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Product does not exists', 404));
  } else if (quantity > product.quantity) {
    return next(
      new AppError(`This product only has ${product.quantity} items.`, 400)
    );
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  if (!cart) {
    const newCart = await Cart.create({ userId: sessionUser.id });

    await ProductInCart.create({ cartId: newCart.id, productId, quantity });
  } else {
    const productInCart = await ProductInCart.findOne({
      where: { productId, cartId: cart.id },
    });

    if (!productInCart) {
      // Add product to current cart
      await ProductInCart.create({ cartId: cart.id, productId, quantity });
    } else if (productInCart.status === 'active') {
      return next(
        new AppError('This product is already active in your cart', 400)
      );
    } else if (productInCart.status === 'removed') {
      await productInCart.update({ status: 'active', quantity });
    }
  }

  res.status(200).json({
    status: 'addProductCart',
  });
});

//*  =========== Update Cart =========
const updateCart = catchAsync(async (req, res, next) => {
  const { productId, newQty } = req.body;
  const { sessionUser } = req;

  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Product does not exists', 404));
  } else if (newQty > product.quantity) {
    return next(
      new AppError(`This product only has ${product.quantity} items.`, 400)
    );
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  const productInCart = await ProductInCart.findOne({
    where: { productId, cartId: cart.id },
  });

  if (!productInCart) {
    return next(new AppError('Cart does not exists', 404));
  } else if (productInCart.status === 'active') {
    if (newQty === 0) {
      await productInCart.update({ status: 'removed', quantity: 0 });
    } else {
      await productInCart.update({ quantity: newQty });
    }
  } else if (productInCart.status === 'removed') {
    await productInCart.update({ status: 'active', quantity: newQty });
  }

  res.status(200).json({
    status: 'updateCart',
  });
});

//* =========== Delete Product in Cart =========
const deleteProductCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { productId } = req.params;

  const product = await Product.findOne({
    where: { id: productId, status: 'active' },
  });

  if (!product) {
    return next(new AppError('Product does not exists', 404));
  }

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  const productInCart = await ProductInCart.findOne({
    where: { productId, cartId: cart.id, status: 'active' },
  });

  if (!productInCart) {
    return next(new AppError('Product does not exists in Cart', 404));
  } else if (productInCart.status === 'active') {
    await productInCart.update({ status: 'removed', quantity: 0 });
  }

  res.status(200).json({
    status: 'deleteProductCart',
  });
});

//* =========== Purchase =========
const purchaseCart = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const cart = await Cart.findOne({
    where: { userId: sessionUser.id, status: 'active' },
  });

  const productsInCart = await ProductInCart.findAll({
    where: { cartId: cart.id, status: 'active' },
  });

  let total = 0;

  const products = productsInCart.map(async (product) => {
    const verifyProduct = await Product.findOne({
      where: { id: product.productId },
    });
    total += product.quantity * verifyProduct.price;
    const newQty = verifyProduct.quantity - product.quantity;
    await verifyProduct.update({ quantity: newQty });
    await product.update({ status: 'purchased' });
  });

  await Promise.all(products);

  await Order.create({
    userId: sessionUser.id,
    cartId: cart.id,
    totalPrice: total,
    status: 'purchased',
  });

  await cart.update({ status: 'purchased' });

  res.status(200).json({
    status: 'purchaseCart',
    data: { productsInCart },
  });
});

module.exports = {
  addProductCart,
  updateCart,
  deleteProductCart,
  purchaseCart,
};
