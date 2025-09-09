"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getAllTasks = exports.createTask = void 0;
const TodoList_1 = __importDefault(require("../model/TodoList"));
const buildSearchFilter = (search) => ({
    trashData: false,
    ...(search.trim() && {
        $or: search
            .trim()
            .split(/\s+/)
            .map((term) => ({ text: { $regex: term, $options: "i" } })),
    }),
});
const createTask = (data) => TodoList_1.default.create(data);
exports.createTask = createTask;
const getAllTasks = async (page, pageSize, search) => {
    const filter = buildSearchFilter(search);
    const [totalTasks, tasks] = await Promise.all([
        TodoList_1.default.countDocuments(filter),
        TodoList_1.default.find(filter)
            .skip((page - 1) * pageSize)
            .limit(pageSize),
    ]);
    return { tasks, totalPages: Math.ceil(totalTasks / pageSize) };
};
exports.getAllTasks = getAllTasks;
const updateTask = (id, data) => TodoList_1.default.findByIdAndUpdate(id, data, { new: true });
exports.updateTask = updateTask;
const deleteTask = (id) => TodoList_1.default.findByIdAndUpdate(id, { trashData: true }, { new: true });
exports.deleteTask = deleteTask;
