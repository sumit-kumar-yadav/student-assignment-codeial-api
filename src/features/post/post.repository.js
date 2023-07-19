import PostModel from './post.model.js';

export default class PostRepository {
    
    async getAll() { 
        return await PostModel.find({});
    }

    async getUserPost(postId) {
        return  await PostModel.findById(postId);
    }
    
    async getUserPosts(userId) {
        return await PostModel.find({user: userId});
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