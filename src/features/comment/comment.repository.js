import CommentModel from './comment.model.js';

export default class CommentRepository {
    
    async getPostComment(commentId){
        return  await CommentModel.findById(commentId).populate('post');
    }

    async getPostComments(postId) { 
        return await CommentModel.find({post: postId}).populate('user', '_id name email');
    }

    async delete(commentId) {
        return await CommentModel.findByIdAndDelete(commentId);
    }

    async add(comment) {
        return await CommentModel.create(comment);
    }

    async update(commentId, updatedData) {
        return await CommentModel.findByIdAndUpdate(commentId, updatedData);
    }

}