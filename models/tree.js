import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: String,
    position: String,
    attributes: {
      type: {
        department: {
          type: String,
        },
      },
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: "TreeNode" }],
  },
  {
    timestamps: true,
  }
);

const NewClientDistributor =
  mongoose.models.NewClientDistributor ||
  mongoose.model("NewClientDistributor", employeeSchema);

module.exports = NewClientDistributor;
