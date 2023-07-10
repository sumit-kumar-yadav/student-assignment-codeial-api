import express from "express";
import { param } from "express-validator";
import { getLikes, toggleLike } from "../controller/like.controller.js";
import validateRoute from "../middleware/validation.js";

const router = express.Router();

router.get(
  "/:postId",
  [param("postId").notEmpty().withMessage("Post ID is required")],
  validateRoute,
  getLikes
);

router.get(
  "/toggle/:postId",
  [param("postId").notEmpty().withMessage("Post ID is required")],
  validateRoute,
  toggleLike
);

export default router;
