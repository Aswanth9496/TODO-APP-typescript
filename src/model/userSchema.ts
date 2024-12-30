import mongoose, { Schema, Document } from "mongoose";

interface ITodo extends Document {
  title: string;
  isCompleted: boolean;
  createdAt: Date;

}

const todoSchema = new Schema<ITodo>({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;

