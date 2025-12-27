// server/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  dotenv.config({ path: "./.env" });

  console.log("🔍 MongoDB Connection Debug:");
  console.log("   URI Present:", !!process.env.MONGO_URI);
  console.log("   URI Length:", process.env.MONGO_URI?.length || 0);
  console.log("   URI Start:", process.env.MONGO_URI?.substring(0, 30) + "...");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.error("Full error:", error);
    process.exit(1);
  }
};

export default connectDB;
