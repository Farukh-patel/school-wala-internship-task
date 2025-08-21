import express from "express";
import mysql from "mysql2";
import router from "./routes/school.js"; 
import db from "./controllers/db.js";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/schools", router);

//to just chech server is started or not in deployment
app.get("/",(req,res)=>{
  res.send("server running ")
});
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
