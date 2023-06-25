import express from 'express';
import PostController from './post.controller.js';
import upload from '../../middleware/fileupload.middleware.js';

const router = express.Router();

const postController = new PostController();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.post('/', upload.single('imageUrl'), postController.addPost);

export default router;
