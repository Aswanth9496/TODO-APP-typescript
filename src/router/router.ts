import { Router } from "express";
import todoController from "../controller/control";

const router = Router();

// Routes for Todo app

router.get("/", todoController.loadDashbord);
router.post("/addTodo", todoController.addTodo);
router.delete("/deleteTodo/:id", todoController.deleteTodo);
router.patch("/toggleTodo/:id", todoController.toggleTodoStatus);



export default router;
