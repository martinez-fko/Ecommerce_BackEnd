// Models
const { User } = require("./user.model");
const { Order } = require("./order.model");
const { Product } = require("./product.model");
const { Cart } = require("./cart.model");
const { Category } = require("./category.model");
const { ProductInCart } = require("./productInCart.model");
const { ProductImg } = require("./productImg.model");

const initModels = () => {
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);

  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);

  Cart.hasOne(Order, { foreignKey: "cartId" });
  Order.belongsTo(Cart);

  User.hasMany(Product, { foreignKey: " userId" });
  Product.belongsTo(User);

  Category.hasMany(Product, { foreignKey: " categoryId" });
  Product.belongsTo(Category);

  Product.hasMany(ProductImg, { foreignKey: " productId" });
  ProductImg.belongsTo(Product);

  Cart.hasMany(ProductInCart, { foreignKey: "cartId" });
  ProductInCart.belongsTo(Cart);
};

module.exports = { initModels };
