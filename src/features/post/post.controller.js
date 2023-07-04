import PostModel from './post.model.js';
import CommentModel from '../comment/comment.model.js';
import LikeModel from '../like/like.model.js';

export default class PostController{
    
    // Get all the posts of all the users for news feed
    getAllPosts(req, res){
        let posts = PostModel.getAll();

        let self = this;
        posts = posts.map((post) => {
            const postComments = CommentModel.getPostComments(post.id);
            const postLikes = LikeModel.getPostLikes(post.id);

            post.comments = postComments.length;
            post.likes = postLikes.length;

            return post;
        });
        
        res.status(200).send(posts);
    }

    // Get single post of a user
    getOnePost(req, res){
        const id = req.params.id;

        let post = PostModel.getUserPost(id);
        if(!post) res.status(400).send("Post not found");

        else {
            const postComments = CommentModel.getPostComments(post.id);
            const postLikes = LikeModel.getPostLikes(post.id);

            post.comments = postComments.length;
            post.likes = postLikes.length;

            res.status(200).send(post);
        }
    }

    // Get all the posts of a particular user for profile page
    getPosts(req, res){
        let posts = PostModel.getUserPosts(req.userId);
        if(!posts || posts.length == 0) res.status(200).send([]);

        else {
            let self = this;
            posts = posts.map((post) => {
                const postComments = CommentModel.getPostComments(post.id);
                const postLikes = LikeModel.getPostLikes(post.id);

                post.comments = postComments.length;
                post.likes = postLikes.length;

                return post;
            });
            
            res.status(200).send(posts);
        }
    }

    //Delete a post
    deletePost(req, res){
        const postId = req.params.id;
        const userId = req.userId;

        const isDeleted = PostModel.delete(postId, userId);

        if(isDeleted) res.status(200).send("Post is deleted Successfully");
        else res.status(400).send("Post cannot be deleted");
    }

    // Create a new post
    addPost(req, res){
        const { caption } = req.body;

        const data = {
            userId: req.userId,
            caption,
            imageUrl: req.file.filename
        }

        const post =  PostModel.add(data);

        res.status(201).send(post);
    }

    // Update a post
    update(req, res){
        const postId = req.params.id;
        
        let post = PostModel.getUserPost(postId);
        if(!post) res.status(400).send("Post not found");

        const updatedData = {
            caption : req.body.caption || post.caption,
            imageUrl : (req.file && req.file.filename) || post.imageUrl
        }

        const isUpdated = PostModel.update(updatedData, req.userId, postId);

        if(isUpdated) res.status(200).send("Post is updated Successfully");
        else res.status(400).send("Post cannot be updated");
    }
    
}