import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    name: String,
    position: String,
    city: String,
    country: String,
    referralOfTheMonth: { type: Number, default: 0 },
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

const NewMLMTreeData =
  mongoose.models.NewMLMTreeData ||
  mongoose.model("NewMLMTreeData", employeeSchema);

export default NewMLMTreeData;
