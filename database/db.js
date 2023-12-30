import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseURL = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURL);
    console.log(`connected to mongodb atlas database`);
  } catch (error) {
    console.log(
      `Failed to connected to mongodb atlas database ${error.message}`
    );
    process.exit(1);
  }
};

export default connectDB;
