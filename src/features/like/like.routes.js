import express from 'express';
import LikeController from './like.controller.js';

const router = express.Router();

const likeController = new LikeController();

router.get('/:id', likeController.getLikes);
router.get('/toggle/:id', likeController.toggleLike);

export default router;
