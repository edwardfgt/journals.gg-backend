import express from "express";
import cors from "cors";
import router from "./routes/router.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use("/", express.static("public"));

const port = 3000;

app.get("/", (request, response) => {
  response.status(200).send("Hello World!");
});

app.listen(port, () => {
  console.log("port running on http://localhost:" + port);
});
