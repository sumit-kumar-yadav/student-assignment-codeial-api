import LikeModel from './like.model.js';

export default class LikeRepository {
    
    async getLikes(id, type){
        return  await LikeModel.find({likeable: id, on_model: type}).populate('user', '_id name email');
    }

    async getLike(id, userId, type) {
        return await LikeModel.findOne({likeable: id, user: userId, on_model: type});
    }

    async delete(id, userId, type) {
        return await LikeModel.deleteOne({likeable: id, user: userId, on_model: type});
    }

    async add(likeData) {
        return await LikeModel.create(likeData);
    }

}