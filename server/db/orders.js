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

module.exports = { createOrderByUserId };
