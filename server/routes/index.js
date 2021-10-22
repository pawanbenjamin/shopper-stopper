const apiRouter = require("express").Router();

apiRouter.use("/users", require("./usersRouter"));

apiRouter.use("/products", require("./productsRouter"));

apiRouter.use("/orders", require("./ordersRouter"));

module.exports = apiRouter;
