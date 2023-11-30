import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    referralCode: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    reward: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.dashboardUsers ||
  mongoose.model("dashboardUsers", userSchema);
