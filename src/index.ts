import express from "express";
import path from "path";
import router from "./router/router";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../src/views"));
app.use(morgan('dev'));

app.use('/', router);  // Make sure this line is correct

mongoose.connect(process.env.MONGODB as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
