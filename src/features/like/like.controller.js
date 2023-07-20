import LikeRepository from './like.repository.js';

export default class LikeController{

    constructor(){
        this.likeRepository = new LikeRepository();
    }

    // Get all the likes of a post / comment
    getLikes = async (req, res) => {
        const { id } = req.params;
        const { type } = req.query;
        const likes = await this.likeRepository.getLikes(id, type);

        if(!likes || likes.length == 0) return res.status(200).send([]);
        else return res.status(200).send(likes);
    }

    // Create a new like
    toggleLike = async (req, res) => {
        const { id } = req.params;
        const { type } = req.query;
        const userId = req.userId;

        // Check if like already exist for this post / comment
        const likeExists = await this.likeRepository.getLike(id, userId, type);

        if(likeExists) {
            // Delete the existing like
            const isDeleted = await this.likeRepository.delete(id, userId, type);
            if(isDeleted) return res.status(200).send(`${type} is unliked successfully.`);
            else return res.status(400).send("Cannot be unliked.");

        }else{
            // Create new like
            const data = {
                user: userId,
                likeable: id,
                on_model: type
            }
    
            const like =  await this.likeRepository.add(data);
    
            return res.status(201).send(`${type} is liked successfully.`);
        }
    }
    
}