import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to Mongo DB");
    process.exit(1);
  }
};

export default connectDB;
