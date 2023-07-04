import express from 'express';
import CommentController from './comment.controller.js';

const router = express.Router();

const commentController = new CommentController();

router.get('/:id', commentController.getComments);
router.post('/:id', commentController.addComment);
router.delete('/:id', commentController.deleteComment);
router.put('/:id', commentController.update);

export default router;
