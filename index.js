const express = require("express");
const mysql = require("mysql2");
const router = require("./routes/school.js");
const db = require("./controllers/db.js");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/schools", router);

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
