const db = require("../config/dbconfig");

async function createMessage(name, message) {
  let connection;
  try {
    connection = await db.getConnection();

    const [result] = await connection.execute(
      `INSERT INTO messages (name, message) VALUES (?, ?)`,
      [name, message]
    );

    const [rows] = await connection.execute(
      `SELECT id, name, message, created_at 
      FROM messages 
      WHERE id = ?`,
      [result.insertId]
    );

    return rows[0];
  } catch (error) {
    console.error("Error fetching messages from database:", error);
    throw new Error("Could not retrieve messages: " + error.message);
  } finally {
    if (connection) connection.release();
  }
}

async function getMessages(limit, offset) {
  let connection;
  try {
    connection = await db.getConnection();

    const sqlQuery = `
            SELECT id, name, message, created_at
            FROM messages
            ORDER BY created_at DESC
            LIMIT ${limit} OFFSET ${offset}
        `;

    const [rows] = await connection.execute(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error fetching messages from database:", error);
    throw new Error("Could not retrieve messages: " + error.message);
  } finally {
    if (connection) connection.release();
  }
}

async function getTotalMessageCount() {
  let connection;
  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute(
      `SELECT COUNT(*) AS count FROM messages`
    );
    return rows[0].count;
  } catch (error) {
    console.error("Error counting messages:", error);
    throw new Error("Could not retrieve message count: " + error.message);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { createMessage, getMessages, getTotalMessageCount };
