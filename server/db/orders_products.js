const client = require("./client");

async function addToCart({ orderId, productId, qty }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders_products("orderId", "productId", qty)
                VALUES($1, $2, $3)
                RETURNING * 
        `,
      [orderId, productId, qty]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = { addToCart };
