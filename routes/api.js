import express from "express";
import { default as emailRouter } from "./email/email.router.js";

export const api = express.Router();
api.use("/email", emailRouter);
