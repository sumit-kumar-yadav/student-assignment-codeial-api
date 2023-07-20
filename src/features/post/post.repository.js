import PostModel from './post.model.js';

export default class PostRepository {
    
    async getAll() { 
        return await PostModel.find({}).populate('user', '_id name email');
    }

    async getUserPost(postId) {
        return  await PostModel.findById(postId).populate('user', '_id name email');
    }
    
    async getUserPosts(userId) {
        return await PostModel.find({user: userId}).populate('user', '_id name email');
    }

    async delete(postId) {
        return await PostModel.findByIdAndDelete(postId);
    }

    async add(post) {
        return await PostModel.create(post);
    }

    async update(postId, updatedData) {
        return await PostModel.findByIdAndUpdate(postId, updatedData);
    }

}