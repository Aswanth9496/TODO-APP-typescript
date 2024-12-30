import { Request, Response } from "express";
import Todo from "../model/userSchema";


const loadDashbord = async (req: Request, res: Response) => {
  try {
    const data = await Todo.find();
    res.render("dashbord", { todos: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loading todos" });
  }
};



const addTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = new Todo({
      title,
      isCompleted: false,
    });

    await newTodo.save();

    res.status(201).json({ message: "Todo added successfully", todo: newTodo });
  } catch (error) {
    console.error("Error adding todo:", error);
    res.status(500).json({ message: "Failed to add todo" });
  }
};



const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: "Todo ID is required" });
    }

    await Todo.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ success: false, message: "Failed to delete todo" });
  }
};


const toggleTodoStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    
    todo.isCompleted = !todo.isCompleted;
    await todo.save();

    res.status(200).json({ success: true, todo });
  } catch (error) {
    console.error("Error toggling todo status:", error);
    res.status(500).json({ message: "Failed to toggle todo status" });
  }
};





export default {
  loadDashbord,
  addTodo,
  deleteTodo,
  toggleTodoStatus
};
