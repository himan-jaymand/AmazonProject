import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const app = express();
const PORT = process.env.PORT || 5502;

// Middleware ( JSON  CORS)
app.use(express.json());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "http://localhost:3000",
    credentials: true,
  })
);
// =======================================================
// ۲.   Endpoint  ( test)
app.get("/", (req, res) => {
  res.send("Amazon Clone API");
});

// : app.use('/api/products', productRoutes);
// =======================================================

// =======================================================
// Initialize database and start server
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server created on ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    // Graceful shutdown: close connections if needed
    process.exit(1);
  }
})();
