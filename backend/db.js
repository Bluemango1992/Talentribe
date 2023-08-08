import mysql from 'mysql2/promise';

// create a connection pool instead of a single connection for better performance
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Caterham7!',
  database: 'talentribe'
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to the database.");
    connection.release();
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

testConnection();

export default pool;

