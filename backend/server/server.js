import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 5502;

// Middleware ( JSON  CORS)
app.use(express.json());
app.use(cors());

// =======================================================
// ۲.   Endpoint  ( test)
app.get("/", (req, res) => {
  res.send("Amazon Clone API");
});

// : app.use('/api/products', productRoutes);
// =======================================================

// =======================================================
// listen
connectDB();
app.listen(PORT, () => {
  console.log(`sever createt on ${PORT}`);
});

