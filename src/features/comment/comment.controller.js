import CommentRepository from './comment.repository.js';
import LikeRepository from '../like/like.repository.js';

export default class CommentController{

    constructor(){
        this.commentRepository = new CommentRepository();
        this.likeRepository = new LikeRepository();
    }

    // Get all the comments of a post
    getComments = async (req, res) => {
        try {
            let comments = await this.commentRepository.getPostComments(req.params.postId);
            
            if(!comments || comments.length == 0) 
                return res.status(200).send([]);

            else {
                comments = await Promise.all(comments.map(async (comment) => {
                    const commentLikes = await this.likeRepository.getLikes(comment._id, 'Comment');

                    comment = comment.toJSON();
                    comment.likes = commentLikes.length;
                    return comment;

                }))

                return res.status(200).send(comments);
            }

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    //Delete a comment
    deleteComment = async (req, res) => {
        try {
            const commentId = req.params.commentId;
            const userId = req.userId;

            const comment = await this.commentRepository.getPostComment(commentId);
            if(!comment) return res.status(400).send("Comment not found");
            
            // Comment can only be deleted either by comment owner or post owner.
            if(!(comment.user == userId || comment.post.user == userId))
                return res.status(400).send("Cannot delete the comment");

            const isDeleted = await this.commentRepository.delete(commentId);

            if(isDeleted) return res.status(200).send("Comment is deleted Successfully");
            else return res.status(400).send("Comment cannot be deleted");

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Create a new comment
    addComment = async (req, res) => {
        try {
            const postId = req.params.postId;
            const { content } = req.body;

            const data = {
                user: req.userId,
                post: postId,
                content,
            }

            const comment =  await this.commentRepository.add(data);

            return res.status(201).send(comment);

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Update a comment
    update = async (req, res) => {
        try {
            const commentId = req.params.commentId;
        
            let comment = await this.commentRepository.getPostComment(commentId);
            if(!comment) return res.status(400).send("Comment not found");

            // Only comment owner can update the comment
            if(comment.user != req.userId) 
                return res.status(400).send("Cannot update the comment");

            const updatedData = {
                content : req.body.content || comment.content,
            }

            const isUpdated = await this.commentRepository.update(commentId, updatedData);

            if(isUpdated) return res.status(200).send("Comment is updated Successfully");
            else return res.status(400).send("Comment cannot be updated");

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
    
}