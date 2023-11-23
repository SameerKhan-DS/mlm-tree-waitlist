import mongoose, { Schema } from "mongoose";

const waitListSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    city: String,
    country: String,
    pack: String,
    email: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const NewWaitListWithTime =
  mongoose.models.NewWaitListWithTime || mongoose.model("NewWaitListWithTime", waitListSchema);

export default NewWaitListWithTime;
