import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const port = process.env.PORT;

const sampleStops = [
  {
    name: "Café de Flore",
    description: "Historic café, once frequented by philosophers and artists.",
    coordinates: { lat: 48.8546, lng: 2.3332 },
    estimatedMinutesAtStop: 25,
  },
  {
    name: "Boot Café",
    description: "Tiny, quirky coffee spot in a former cobbler’s shop.",
    coordinates: { lat: 48.8625, lng: 2.3593 },
    estimatedMinutesAtStop: 20,
  },
  {
    name: "Shakespeare and Company Café",
    description: "Bookshop café with great views of Notre Dame.",
    coordinates: { lat: 48.8526, lng: 2.347 },
    estimatedMinutesAtStop: 30,
  },
  {
    name: "Fragments Paris",
    description: "Trendy spot known for its specialty brews and pastries.",
    coordinates: { lat: 48.8657, lng: 2.3615 },
    estimatedMinutesAtStop: 20,
  },
];

app.get("/", (req, res) => {
  res.send("Server healthy!");
});

app.post("/generate-tour", (req, res) => {
  const { city, interests } = req.body;
  console.log(city, interests);
  res.json(sampleStops);
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});
