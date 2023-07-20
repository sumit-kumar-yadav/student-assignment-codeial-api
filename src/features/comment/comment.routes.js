import express from 'express';
import CommentController from './comment.controller.js';

const router = express.Router();

const commentController = new CommentController();

router.get('/:postId', commentController.getComments);
router.post('/:postId', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);
router.put('/:commentId', commentController.update);

export default router;
