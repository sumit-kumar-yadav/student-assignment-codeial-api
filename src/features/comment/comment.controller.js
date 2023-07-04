import CommentModel from './comment.model.js';

export default class CommentController{

    // Get all the comments of a post
    getComments(req, res){
        const comments = CommentModel.getPostComments(req.params.id);
        if(!comments || comments.length == 0) res.status(200).send([]);
        else res.status(200).send(comments);
    }

    //Delete a comment
    deleteComment(req, res){
        const commentId = req.params.id;
        const userId = req.userId;

        const isDeleted = CommentModel.delete(commentId, userId);

        if(isDeleted) res.status(200).send("Comment is deleted Successfully");
        else res.status(400).send("Comment cannot be deleted");
    }

    // Create a new comment
    addComment(req, res){
        const postId = req.params.id;
        const { content } = req.body;

        const data = {
            userId: req.userId,
            postId: postId,
            content,
        }

        const comment =  CommentModel.add(data);

        res.status(201).send(comment);
    }

    // Update a comment
    update(req, res){
        const commentId = req.params.id;
        
        let comment = CommentModel.getPostComment(commentId);
        if(!comment) res.status(400).send("Comment not found");

        const updatedData = {
            content : req.body.content || comment.content,
        }

        const isUpdated = CommentModel.update(updatedData, req.userId, commentId);

        if(isUpdated) res.status(200).send("Comment is updated Successfully");
        else res.status(400).send("Comment cannot be updated");
    }
    
}