import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (process.env.MONGODB_URL) {
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("connected with db");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
