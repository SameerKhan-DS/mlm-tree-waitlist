import mongoose from "mongoose";
const Schema = mongoose.Schema;

const supportForm = new Schema({
  firstName: String,
  lastName: String,
  object: String,
  message:String
});

const ticketForm =
  mongoose.models.ticketForm || mongoose.model("ticketForm", supportForm);

export default ticketForm;
