"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Counter_1 = __importDefault(require("./Counter"));
const taskSchema = new mongoose_1.default.Schema({
    todolistId: { type: Number, unique: true },
    text: { type: String, required: true },
    trashData: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
taskSchema.pre("save", async function () {
    if (!this.isNew)
        return;
    const { value } = await Counter_1.default.findOneAndUpdate({ name: "todolistId" }, { $inc: { value: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true }).lean() ?? { value: 1 };
    this.todolistId = value;
});
exports.default = mongoose_1.default.model("Task", taskSchema);
