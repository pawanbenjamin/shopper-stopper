const client = require("./client");

async function addToCart({ orderId, productId, qty }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      INSERT INTO orders_products("orderId", "productId", qty)
           VALUES($1, $2, $3)
           RETURNING * 
        `,
      [orderId, productId, qty]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}

async function removeFromCart({ productId, orderId }) {
  try {
    const {
      row: [order_product],
    } = await client.query(
      `
      DELETE FROM orders_products as op
          WHERE op."productId"=$1 and op."orderId"=$2
          RETURNING *
    `,
      [productId, orderId]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}

module.exports = { addToCart, removeFromCart };
