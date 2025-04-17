import express from "express";
import { chatWithAI } from "../controllers/Chat.controller.js";

const router = express.Router();

router.post("/chat", chatWithAI);

export default router;
