const orders_productsRouter = require("express").Router();

const { addToCart, removeFromCart } = require("../db");

orders_productsRouter.post("/orders_products", async (req, res, next) => {
  try {
    const order_product = await addToCart(req.body); // orderId, productId, qty
    res.send(order_product);
  } catch (error) {
    next(error);
  }
});

orders_productsRouter.delete("/orders_products", async (req, res, next) => {
  try {
    const deletedOrderProduct = await removeFromCart(req.body); // productId, orderId
    res.send(deletedOrderProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = orders_productsRouter;
