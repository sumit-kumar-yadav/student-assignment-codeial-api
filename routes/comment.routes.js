import express from "express";
import {
  getCommentsController,
  addCommentController,
  deleteCommentController,
  updateCommentController,
} from "../controller/comment.controller.js";

const router = express.Router();

router.get("/:id", getCommentsController);
router.post("/:id", addCommentController);
router.delete("/:id", deleteCommentController);
router.put("/:id", updateCommentController);

export default router;
