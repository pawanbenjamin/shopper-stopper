const client = require("./client");

const { createUser, createProduct } = require("./index");

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
        "orderId" INTEGER REFERENCES orders(id)
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
  ];

  const createdUsers = await Promise.all(users.map(createUser));
  console.log("Users:", createdUsers);

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
  ];

  const createdProducts = await Promise.all(products.map(createProduct));
  console.log("Products:", createdProducts);

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
