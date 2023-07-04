export default class LikeModel{
    
    constructor(id, userId, postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static lastId = 3;

    // Get all the likes on a post
    static getPostLikes(postId){
        let postLikes = likes.filter((like) => (
            like.postId == postId
        ));
        return postLikes;
    }

    // Get a like using postId, userId
    static getPostLike(postId, userId){
        const like = likes.find((like)=> 
                like.postId == postId && like.userId == userId
        );
        return like;
    }

    // Create a new like 
    static add(like){
        this.lastId++; // Increment the last assigned ID
        like.id = this.lastId;
        likes.push(like);
        return like;
    }

    // Delete a like
    static delete(postId, userId) {
        const index = likes.findIndex((like) => like.postId == postId && like.userId == userId);
        if (index !== -1) {
          likes.splice(index, 1);
          return true;
        }
        return false;
    }

}

let likes = [
    new LikeModel(
        1,
        1,
        1,
    ),
    new LikeModel(
        2, 
        2,
        2,
    ),
    new LikeModel(
        3, 
        3,
        3,
    )

]