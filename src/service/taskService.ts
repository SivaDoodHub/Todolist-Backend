import TaskTo, { Task } from "../model/TodoList";

const buildSearchFilter = (search: string) => ({
  trashData: false,
  ...(search.trim() && {
    $or: search
      .trim()
      .split(/\s+/)
      .map((term) => ({ text: { $regex: term, $options: "i" } })),
  }),
});

export const createTask = (data: Partial<Task>) => TaskTo.create(data);

export const getAllTasks = async (
  page: number,
  pageSize: number,
  search: string
) => {
  const filter = buildSearchFilter(search);
  const [totalTasks, tasks] = await Promise.all([
    TaskTo.countDocuments(filter),
    TaskTo.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize),
  ]);
  return { tasks, totalPages: Math.ceil(totalTasks / pageSize) };
};

export const updateTask = (id: string, data: Partial<Task>) =>
  TaskTo.findByIdAndUpdate(id, data, { new: true });

export const deleteTask = (id: string) =>
  TaskTo.findByIdAndUpdate(id, { trashData: true }, { new: true });
