const client = require("./client");

async function createOrderByUserId(userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            INSERT INTO orders("userId")
                VALUES($1)
                RETURNING * 
        `,
      [userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

// Get Cart (order that is active) and include everything
async function getCart(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
      SELECT *
          FROM orders 
          INNER JOIN orders_products as op
            ON op."orderId" = orders.id
          INNER JOIN products as p
          	ON op."productId" = p.id  
     	    WHERE orders."userId" = $1   
    `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = { createOrderByUserId };
