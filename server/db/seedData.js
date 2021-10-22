const client = require("./client");

const { createUser, createProduct } = require("./index");
const { createOrderByUserId } = require("./orders");
const { addToCart } = require("./orders_products");

async function buildTables() {
  try {
    client.connect();

    await client.query(`
        DROP TABLE IF EXISTS orders_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
      `);

    console.log("Creating Users Table...");

    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );`);

    console.log("Creating Orders Table...");

    await client.query(`
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        isActive BOOLEAN DEFAULT true
      );
        `);

    console.log("Creating Products...");

    await client.query(`
        CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          price INTEGER,
          stockQty INTEGER
        );
      `);

    await client.query(`
      CREATE TABLE orders_products(
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        qty INTEGER
      );`);
  } catch (error) {
    throw error;
  }
}

// Create Initial Users
async function seedDb() {
  const users = [
    {
      username: "Pawan",
      password: "12345678",
    },
    {
      username: "Tim",
      password: "87654321",
    },
    {
      username: "Ben",
      password: "12345678",
    },
    {
      username: "Michael",
      password: "98765432",
    },
  ];

  console.log("Creating Users...");
  const createdUsers = await Promise.all(users.map(createUser));
  console.log("Users:", createdUsers);

  console.log("Creating Orders...");
  const createdOrders = await Promise.all(
    createdUsers.map((user) => {
      return createOrderByUserId(user.id);
    })
  );
  console.log("Created Orders", createdOrders);

  const products = [
    {
      name: "Banana",
      description: "The most yellow of fruit",
      price: 299,
      stockQty: 100,
    },
    {
      name: "Apple",
      description: "A red one",
      price: 199,
      stockQty: 100,
    },
    {
      name: "Pineapple",
      description: "Yellow, pretty much",
      price: 299,
      stockQty: 300,
    },
    {
      name: "Passion Fruit",
      description: "A Tropical Delight",
      price: 2999,
      stockQty: 5,
    },
  ];

  console.log("Creating Products...");
  const createdProducts = await Promise.all(products.map(createProduct));
  console.log("Products:", createdProducts);

  const carts = [
    { orderId: 1, productId: 1, qty: 2 },
    { orderId: 2, productId: 2, qty: 2 },
  ];

  console.log("Adding items to Cart...");
  const createdCarts = await Promise.all(
    carts.map((cart) => {
      return addToCart(cart);
    })
  );
  console.log("Carts:", createdCarts);

  try {
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(async () => {
    console.log("db built!");
    console.log("Seeding DB....");
    await seedDb();
    console.log("DB Seeded!");
  })
  .catch(console.error)
  .finally(() => client.end());
