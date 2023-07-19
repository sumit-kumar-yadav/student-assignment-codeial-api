import express from 'express';
import PostController from './post.controller.js';
import upload from '../../middleware/fileupload.middleware.js';

const router = express.Router();

const postController = new PostController();

router.get('/all', postController.getAllPosts);
router.get('/:postId', postController.getOnePost);
router.get('/', postController.getPosts);
router.post('/', upload.single('imageUrl'), postController.addPost);
router.delete('/:postId', postController.deletePost);
router.put('/:postId', upload.single('imageUrl'), postController.update);

export default router;
