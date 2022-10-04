// Models
const { Cart } = require("../models/cart.model");
const { ProductInCart } = require("../models/productInCart.model");
const { Product } = require("../models/product.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const cartExists = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  let cart = await Cart.findOne({ where: { userId: sessionUser.id } });

  if (!cart) {
    cart = await Cart.create({ userId: sessionUser.id });
  }

  req.cart = cart;
  next();
});

const productInCartExists = catchAsync(async (req, res, next) => {
  const { productId } = req.body;
  const { cart } = req;

  const productInCart = await ProductInCart.findOne({
    where: { cartId: cart.id, productId },
  });
  
  if(!productInCart){
    if (productInCart.status === "active") {
      return next(new AppError("Product exists in Cart", 404));
    }
  }

  const product = await Product.findOne({ where: { id: productId } });

  req.product = product;
  req.productInCart = productInCart;
  next();
});

module.exports = { cartExists, productInCartExists };
