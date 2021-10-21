const { createUser, updateUser, deleteUser, getUser } = require("./users");
const { createProduct } = require("./products");
const { createOrderByUserId } = require("./orders");
const { addToCart } = require("./orders_products");

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  createProduct,
  createOrderByUserId,
  addToCart,
};
