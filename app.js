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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});

export default app;
