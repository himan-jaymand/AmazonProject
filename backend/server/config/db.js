// server/config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {   try {  try {
    dotenv.config({ path: "./.env" });
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

      serverSelectionTimeoutMS: 5000,

      socketTimeoutMS: 45000,

    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    return conn;

  } catch (error) {

    console.error(`❌ MongoDB connection error: ${error.message}`);

    console.error("Full error:", error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);

  }
} catch (error) {
    console.error("Unexpected error during DB connection:", error);
    throw error;
  }
};
export default connectDB;
