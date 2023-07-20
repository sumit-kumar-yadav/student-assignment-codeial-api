import { ApplicationError } from '../../error-handler/applicationError.js';
import PostRepository from './post.repository.js';
import CommentRepository from '../comment/comment.repository.js';
import LikeRepository from '../like/like.repository.js';

export default class PostController{

    constructor(){
        this.postRepository = new PostRepository();
        this.commentRepository = new CommentRepository();
        this.likeRepository = new LikeRepository();
    }
    
    // Get all the posts of all the users for news feed
    getAllPosts = async (req, res) => {
        try {
            let posts = await this.postRepository.getAll();

            posts = await Promise.all(posts.map(async (post) => {
                const postComments = await this.commentRepository.getPostComments(post.id);
                const postLikes = await this.likeRepository.getPostLikes(post.id);

                post = post.toJSON();
                post.comments = postComments.length;
                post.likes = postLikes.length;
                return post;

            }));
            
            return res.status(200).send(posts);
            
        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Get single post of a user
    getOnePost = async (req, res) => {
        try {
            const { postId } = req.params;

            let post = await this.postRepository.getUserPost(postId);
            if(!post) throw new ApplicationError("Post not found", 400);

            else {
                const postComments = await this.commentRepository.getPostComments(post.id);
                const postLikes = await this.likeRepository.getPostLikes(post.id);

                post = post.toJSON();
                post.comments = postComments.length;
                post.likes = postLikes.length;

                return res.status(200).send(post);
            }

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Get all the posts of a particular user for profile page
    getPosts = async (req, res) => {
        try {
            let posts = await this.postRepository.getUserPosts(req.userId);
            if(!posts || posts.length == 0) return res.status(200).send([]);

            else {
                posts = await Promise.all(posts.map(async (post) => {
                    const postComments = await this.commentRepository.getPostComments(post.id);
                    const postLikes = await this.likeRepository.getPostLikes(post.id);
    
                    post = post.toJSON();
                    post.comments = postComments.length;
                    post.likes = postLikes.length;
    
                    return post;
                }));
                
                return res.status(200).send(posts);
            }

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    //Delete a post
    deletePost = async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.userId;

            const post = await this.postRepository.getUserPost(postId);
            if(!post) return res.status(400).send("Post not found");
            if(post.user != userId) return res.status(400).send("Unauthorized to delete the post");

            const isDeleted = await this.postRepository.delete(postId);

            if(isDeleted) return res.status(200).send("Post is deleted Successfully");
            else return res.status(400).send("Post cannot be deleted");

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Create a new post
    addPost = async (req, res) => {
        try {
            const { caption } = req.body;

            const data = {
                user: req.userId,
                caption,
                imageUrl: req.file.filename
            }

            const post =  await this.postRepository.add(data);

            return res.status(201).send(post);

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Update a post
    update = async (req, res) => {
        try {
            const { postId } = req.params;
        
            let post = await this.postRepository.getUserPost(postId);
            if(!post) return res.status(400).send("Post not found");
            if(post.user != req.userId) return res.status(400).send("Unauthorized to update the post");

            const updatedData = {
                caption : req.body.caption || post.caption,
                imageUrl : (req.file && req.file.filename) || post.imageUrl
            }

            const isUpdated = await this.postRepository.update(postId, updatedData);

            if(isUpdated) return res.status(200).send("Post is updated Successfully");
            else return res.status(400).send("Post cannot be updated");

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
    
}