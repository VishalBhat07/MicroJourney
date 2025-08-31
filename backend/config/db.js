import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Mongo DB connected successfully");
  } catch (err) {
    console.log("Mongo DB connection error", err);
  }
};

export default connectDB;
