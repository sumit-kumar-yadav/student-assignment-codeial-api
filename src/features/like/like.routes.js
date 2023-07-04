import express from 'express';
import LikeController from './like.controller.js';

const router = express.Router();

const likeController = new LikeController();

router.get('/:postId', likeController.getLikes);
router.get('/toggle/:postId', likeController.toggleLike);

export default router;
