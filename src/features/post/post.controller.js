import PostModel from './post.model.js';

export default class PostController{
    getAllPosts(req, res){
        const posts = PostModel.getAll();
        res.status(200).send(posts);
    }

    getOnePost(req, res){
        const id = req.params.id;
        const post = PostModel.get(id);
        if(!post) res.status(400).send("Post not found");
        else res.status(200).send(post);
    }

    addPost(req, res){
        const { caption } = req.body;

        const data = {
            caption,
            imageUrl: req.file.filename
        }

        const post =  PostModel.add(data);

        res.status(201).send(post);
    }
    
}