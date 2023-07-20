import LikeModel from './like.model.js';

export default class LikeRepository {
    
    async getPostLikes(postId){
        return  await LikeModel.find({post: postId}).populate('user', '_id name email');
    }

    async getPostLike(postId, userId) {
        return await LikeModel.findOne({post: postId, user: userId});
    }

    async delete(postId, userId) {
        return await LikeModel.deleteOne({post: postId, user: userId});
    }

    async add(likeData) {
        return await LikeModel.create(likeData);
    }

}