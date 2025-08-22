const mysql = require("mysql2");

const db = mysql.createConnection(process.env.DATABASE_URL);

module.exports = db;
