import LikeModel from './like.model.js';

export default class LikeController{

    // Get all the likes of a post
    getLikes(req, res){
        const { postId } = req.params;
        const likes = LikeModel.getPostLikes(postId);
        if(!likes || likes.length == 0) res.status(200).send([]);
        else res.status(200).send(likes);
    }

    // Create a new like
    toggleLike(req, res){
        const { postId } = req.params;
        const userId = req.userId;

        // Check if like already exist for this post
        const likeExists = LikeModel.getPostLike(postId, userId);

        if(likeExists) {
            // Delete the existing like
            const isDeleted = LikeModel.delete(postId, userId);
            if(isDeleted) res.status(200).send("Like is deleted Successfully");
            else res.status(400).send("Like cannot be deleted");

        }else{
            // Create new like
            const data = {
                userId,
                postId,
            }
    
            const like =  LikeModel.add(data);
    
            res.status(201).send(like);
        }
    }
    
}