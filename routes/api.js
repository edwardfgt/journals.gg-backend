import express from "express";
import { default as emailRouter } from "./email/email.router.js";
import { default as subscribeRouter } from "./subscribe/subscribe.router.js";

export const api = express.Router();
api.use("/email", emailRouter);
api.use("/subscribe", subscribeRouter);
