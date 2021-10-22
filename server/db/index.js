const { createUser, updateUser, deleteUser, getUser } = require("./users");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./products");

const {
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getCart,
  getAllOrders,
  deleteOrderById,
} = require("./orders");

const { addToCart, removeFromCart } = require("./orders_products");

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
  getOrderById,
  getAllOrdersByUserId,
  getCart,
  getAllOrders,
  deleteOrderById,
  addToCart,
  removeFromCart,
};
