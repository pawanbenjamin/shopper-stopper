const orders_productsRouter = require("express").Router();

const { addToCart, removeFromCart, updateQtyInCart } = require("../db");

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

orders_productsRouter.put("/orders_products", async (req, res, next) => {
  try {
    const updated_op = await updateQtyInCart(req.body); // productId, orderId, qty
    res.send(updated_op);
  } catch (error) {
    next(error);
  }
});

module.exports = orders_productsRouter;
