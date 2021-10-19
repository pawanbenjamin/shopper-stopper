const client = require("./client");

async function createProduct({ name, description, price, stockQty }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, description, price, stockQty)
                VALUES ($1, $2, $3, $4)
                RETURNING * 
        `,
      [name, description, price, stockQty]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = { createProduct };
