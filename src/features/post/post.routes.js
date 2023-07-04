import express from 'express';
import PostController from './post.controller.js';
import upload from '../../middleware/fileupload.middleware.js';

const router = express.Router();

const postController = new PostController();

router.get('/all', postController.getAllPosts);
router.get('/:id', postController.getOnePost);
router.get('/', postController.getPosts);
router.post('/', upload.single('imageUrl'), postController.addPost);
router.delete('/:id', postController.deletePost);
router.put('/:id', upload.single('imageUrl'), postController.update);

export default router;
