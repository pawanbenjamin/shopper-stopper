const apiRouter = require("express").Router();

app.use("/users", require("./usersRouter"));

app.use("/products", require("./productsRouter"));

app.use("/orders", require("./ordersRouter"));

module.exports = apiRouter;
