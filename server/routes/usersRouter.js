const usersRouter = require("express").Router();

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getCart,
} = require("../db");

usersRouter.get(`/:id`, async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/", async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await updateUser(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    await deleteUser(req.params.id);
    res.send("User Sucessfully Removed!");
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:id/cart", async (req, res, next) => {
  try {
    const cart = await getCart(req.params.id);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
