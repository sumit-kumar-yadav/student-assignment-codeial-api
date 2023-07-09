import express from "express";
import { getLikes, toggleLike } from "../controller/like.controller.js";

const router = express.Router();

router.get("/:postId", getLikes);
router.get("/toggle/:postId", toggleLike);

export default router;
