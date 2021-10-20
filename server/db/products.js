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

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
        WHERE id=$1
    `,
      [productId]
    );
  } catch (error) {
    throw error;
  }
}

async function updateProduct({
  name,
  description,
  price,
  stockQty,
  productId,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
            SET name = $1, description = $2, price = $3, stockQty = $4
            WHERE id=$5
            RETURNING *
    `,
      [name, description, price, stockQty, productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

// * can only delete products not attached to an order
async function deleteProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products 
        WHERE id=$1
        RETURNING *
    `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
