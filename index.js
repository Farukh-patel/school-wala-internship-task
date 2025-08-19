const express = require('express');
const mysql = require('mysql2');
const { default: router } = require('./routes/school');
const app = express();
const PORT = 3000;


app.use("/schools",router)
// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password', // replace this
  database: 'testdb'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL.');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
