import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import tourRouter from "./routers/tourRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT;

app.use("/api/tour", tourRouter);

app.get("/", (req, res) => {
  res.send("Server healthy!");
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
