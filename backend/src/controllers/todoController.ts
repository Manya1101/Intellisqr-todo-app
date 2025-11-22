import Todo from "../models/Todo";
import { Request, Response } from "express";

export const getTodos = async (req: any, res: Response) => {
  const todos = await Todo.find({ userId: req.user.id });
  res.json(todos);
};

export const createTodo = async (req: any, res: Response) => {
  const todo = await Todo.create({
    title: req.body.title,
    userId: req.user.id
  });
  res.json(todo);
};

export const updateTodo = async (req: any, res: Response) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
};

export const deleteTodo = async (req: any, res: Response) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
