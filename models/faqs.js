import mongoose from "mongoose";
const Schema = mongoose.Schema;

const faqsData = new Schema({
  title: String,
  content: String,
});

const faqsList =
  mongoose.models.faqsList || mongoose.model("faqsList", faqsData);

export default faqsList;
