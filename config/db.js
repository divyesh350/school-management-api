const mysql = require('mysql2');
require('dotenv').config();
// Option 1: Disable SSL verification (for development only)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


connection.connect(err => {
  if (err) {
    console.error('Connection error:', err);
  } else {
    console.log('Connected successfully!');
    
    // Create schools table if not exists (run once)
    connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL
      )
    `, (err) => {
      if (err) console.error('Error creating table:', err);
      else console.log('Schools table ready');
    });
  }
});

module.exports = connection;
