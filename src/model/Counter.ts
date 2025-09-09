import mongoose from "mongoose";

export interface Counter extends Document {
  name: string;
  value: number;
}

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
});

export default mongoose.model("Counter", counterSchema);
