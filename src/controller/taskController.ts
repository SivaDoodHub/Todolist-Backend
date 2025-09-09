import { Request, Response } from "express";
import * as service from "../service/taskService";

const getQueryParams = ({ query }: Request) => ({
  page: Number(query.page) || 1,
  pageSize: 5,
  search: String(query.search || ""),
});

export const createTask = async ({ body }: Request, res: Response) => {
  try {
    res.json(await service.createTask(body));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { page, pageSize, search } = getQueryParams(req);
    const data = await service.getAllTasks(page, pageSize, search);
    res.json({ ...data, currentPage: page });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async ({ params, body }: Request, res: Response) => {
  try {
    res.json(await service.updateTask(params.id, body));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async ({ params }: Request, res: Response) => {
  try {
    await service.deleteTask(params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
