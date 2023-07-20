import LikeRepository from './like.repository.js';

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    // Get all the likes of a post
    getLikes = async (req, res) => {
        const { postId } = req.params;
        const likes = await this.likeRepository.getPostLikes(postId);

        if(!likes || likes.length == 0) return res.status(200).send([]);
        else return res.status(200).send(likes);
    }

    // Create a new like
    toggleLike = async (req, res) => {
        const { postId } = req.params;
        const userId = req.userId;

        // Check if like already exist for this post
        const likeExists = await this.likeRepository.getPostLike(postId, userId);

        if(likeExists) {
            // Delete the existing like
            const isDeleted = await this.likeRepository.delete(postId, userId);
            if(isDeleted) return res.status(200).send("Post is unliked successfully.");
            else return res.status(400).send("Cannot be unliked.");

        }else{
            // Create new like
            const data = {
                user: userId,
                post: postId,
            }
    
            const like =  await this.likeRepository.add(data);
    
            return res.status(201).send("Post is liked successfully.");
        }
    }
    
}