const { createUser, updateUser, deleteUser, getUser } = require("./users");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./products");
const { createOrderByUserId } = require("./orders");
const { addToCart } = require("./orders_products");

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  createOrderByUserId,
  addToCart,
};
