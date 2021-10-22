const client = require("./client");

async function addToCart({ productId, orderId, qty }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      INSERT INTO orders_products("orderId", "productId", qty)
           VALUES($1, $2, $3)
           RETURNING * 
        `,
      [productId, orderId, qty]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}

async function removeFromCart({ productId, orderId }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      DELETE FROM orders_products as op
          WHERE op."productId"=$1 and op."orderId"=$2
          RETURNING *
    `,
      [productId, orderId]
    );
    console.log("DB METHOD:", order_product);
    return order_product;
  } catch (error) {
    throw error;
  }
}

async function updateQtyInCart({ productId, orderId, qty }) {
  try {
    const {
      rows: [order_product],
    } = await client.query(
      `
      UPDATE orders_products as op
        SET qty=$3
        WHERE "orderId"=$2 and "productId"=$1
    `,
      [productId, orderId, qty]
    );
    return order_product;
  } catch (error) {
    throw error;
  }
}

module.exports = { addToCart, removeFromCart, updateQtyInCart };
