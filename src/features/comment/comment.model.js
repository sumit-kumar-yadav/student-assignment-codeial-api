export default class CommentModel{
    
    constructor(id, userId, postId, content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static lastId = 3;

    // Get all the comments on a post
    static getPostComments(postId){
        let userComments = comments.filter((comment) => (
            comment.postId == postId
        ));
        return userComments;
    }

    // Get a comment using comment id
    static getPostComment(commentId){
        const comment = comments.find((comment)=> comment.id == commentId);
        return comment;
    }

    // Create a new comment 
    static add(comment){
        this.lastId++; // Increment the last assigned ID
        comment.id = this.lastId;
        comments.push(comment);
        return comment;
    }

    // Delete a comment
    static delete(commentId, userId) {
        const index = comments.findIndex((comment) => comment.id == commentId && comment.userId == userId);
        if (index !== -1) {
          comments.splice(index, 1);
          return true;
        }
        return false;
    }

    // Update a comment
    static update(updatedData, userId, commentId) {
        const index = comments.findIndex((comment) => comment.id == commentId && comment.userId == userId);
        if (index !== -1) {
            Object.keys(updatedData).forEach((key) => {
                comments[index][key] = updatedData[key];
            })
            return true;
        }
        return false;
    }
}

let comments = [
    new CommentModel(
        1,
        1,
        1,
        "Comment 1",
    ),
    new CommentModel(
        2, 
        2,
        2,
        "Comment 2",
    ),
    new CommentModel(
        3, 
        3,
        3,
        "Comment 3",
    )

]