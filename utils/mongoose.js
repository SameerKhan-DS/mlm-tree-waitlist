import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URL) {
      await mongoose.connect(process.env.MONGODB_URL);
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
