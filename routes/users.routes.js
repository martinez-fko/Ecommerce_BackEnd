const express = require("express");

// Controllers
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getProductUser,
  getAllOrders,
  getOrderById,
} = require("../controllers/users.controller");

// Middlewares
const { userExists } = require("../middlewares/users.middlewares");
const {orderExists} = require('../middlewares/orders.middlewares')
const {
  protectSession,
  protectUsersAccount,
  protectAdmin,
} = require("../middlewares/auth.middlewares");
const {
  createUserValidators,
} = require("../middlewares/validators.middlewares");

const usersRouter = express.Router();

usersRouter.post("/", createUserValidators, createUser);

usersRouter.post("/login", login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get("/me", getProductUser);

usersRouter.patch("/:id", userExists, protectUsersAccount, updateUser);

usersRouter.delete("/:id", userExists, protectUsersAccount, deleteUser);

usersRouter.get("/orders", getAllOrders);

usersRouter.get("/orders/:id", orderExists, getOrderById);

module.exports = { usersRouter };
