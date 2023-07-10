import express from "express";
import { body, param } from "express-validator";
import validateRoute from "../middleware/validation.js";

import {
  getAllPostsController,
  getOnePostController,
  getPostsController,
  deletePostController,
  addPostController,
  updatePostController,
} from "../controller/post.controller.js";
import upload from "../middleware/fileupload.middleware.js";

const router = express.Router();

router.get("/all", getAllPostsController);

router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Post ID is required")],
  validateRoute,
  getOnePostController
);

router.get("/", getPostsController);

router.post(
  "/",
  [
    body("caption").notEmpty().withMessage("Caption is required"),
    body("imageUrl").notEmpty().withMessage("Image URL is required"),
  ],
  validateRoute,
  upload.single("imageUrl"),
  addPostController
);

router.delete(
  "/:id",
  [param("id").notEmpty().withMessage("Post ID is required")],
  validateRoute,
  deletePostController
);

router.put(
  "/:id",
  [
    param("id").notEmpty().withMessage("Post ID is required"),
    body("caption").notEmpty().withMessage("Caption is required"),
  ],
  validateRoute,
  upload.single("imageUrl"),
  updatePostController
);

export default router;
