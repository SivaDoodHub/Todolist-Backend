import mongoose, { Document } from "mongoose";
import Counter from "./Counter";

export interface Task extends Document {
  _id: string;
  todolistId: number;
  text: string;
  trashData: boolean;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    todolistId: { type: Number, unique: true },
    text: { type: String, required: true },
    trashData: { type: Boolean, default: false },
  },
  { timestamps: true , versionKey: false }
);

taskSchema.pre("save", async function () {
  if (!this.isNew) return;

  const { value } = await Counter.findOneAndUpdate(
    { name: "todolistId" },       
    { $inc: { value: 1 } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean() ?? { value: 1 };

  this.todolistId = value;
});


export default mongoose.model<Task>("Task", taskSchema);
