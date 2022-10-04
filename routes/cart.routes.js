const express = require("express");

// Controllers
const {
  addProductCart,
  updateCart,
  deleteProductCart,
  purchaseCart,
} = require("../controllers/carts.controllers");

// auth
const { protectSession } = require("../middlewares/auth.middlewares");


const cartRouter = express.Router();

// Protecting below endpoints
cartRouter.use(protectSession);

cartRouter.post("/add-product", addProductCart);

cartRouter.patch("/update-cart", updateCart);

cartRouter.delete("/:productId", deleteProductCart);

cartRouter.post("/purchase", purchaseCart);

module.exports = { cartRouter };
