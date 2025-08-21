import mysql from "mysql2";


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export default db;