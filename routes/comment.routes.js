import express from "express";
import {
  getCommentsController,
  addCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controller/comment.controller.js";
import { param, body } from "express-validator";
import validateRoute from "../middleware/validation.js";

const router = express.Router();

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Post ID is required")],
  validateRoute,
  getCommentsController
);

router.post(
  "/:id",
  [
    param("id").notEmpty().withMessage("Post ID is required"),
    body("content").notEmpty().withMessage("Comment content is required"),
  ],
  validateRoute,
  addCommentController
);

router.delete(
  "/:id",
  [param("id").notEmpty().withMessage("Comment ID is required")],
  validateRoute,
  deleteCommentController
);

router.put(
  "/:id",
  [
    param("id").notEmpty().withMessage("Comment ID is required"),
    body("content").notEmpty().withMessage("Comment content is required"),
  ],
  validateRoute,
  updateCommentController
);

export default router;
