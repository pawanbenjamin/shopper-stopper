const ordersRouter = require("express").Router();

const {
  createOrderByUserId,
  getOrderById,
  getAllOrdersByUserId,
  getAllOrders,
  getCart,
  deleteOrderById,
} = require("../db");

ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/:id", async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/user/:userId", async (req, res, next) => {
  try {
    const order = await createOrderByUserId(req.params.userId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/user/:userId/cart", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/user/:userId", async (req, res, next) => {
  try {
    const orders = await getAllOrdersByUserId(req.params.userId);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:id", async (req, res, next) => {
  try {
    const deletedOrder = await deleteOrderById(req.params.id);
    res.send(deletedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
