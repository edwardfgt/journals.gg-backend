import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { api } from "./routes/api.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(api);

export default app;
