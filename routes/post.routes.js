import express from "express";
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
router.get("/:id", getOnePostController);
router.get("/", getPostsController);
router.post("/", upload.single("imageUrl"), addPostController);
router.delete("/:id", deletePostController);
router.put("/:id", upload.single("imageUrl"), updatePostController);

export default router;
