import mongoose, { Schema } from "mongoose";

const waitListSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    city: String,
    country: String,
    pack: String,
    status: String,
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
  {
    timestamps: true,
  }
);

const NewWaitListWithTime =
  mongoose.models.NewWaitListWithTime || mongoose.model("NewWaitListWithTime", waitListSchema);

export default NewWaitListWithTime;
