export default class PostModel{
    
    constructor(id, userId, caption, imageUrl){
        this.id = id,
        this.userId = userId,
        this.caption = caption,
        this.imageUrl = imageUrl;
    }

    static lastId = 3;

    // Get all the posts posted by all the users for news feed
    static getAll(){
        return posts;
    }

    // Get all the posts of a particular user for profile page
    static getUserPosts(userId){
        let userPosts = posts.filter((post) => (
            post.userId == userId
        ));
        return userPosts;
    }

    // Get a particular post of a user using post id
    static getUserPost(postId){
        const post = posts.find((post)=> post.id == postId);
        return post;
    }

    // Create a new post 
    static add(post){
        this.lastId++; // Increment the last assigned ID
        post.id = this.lastId;
        posts.push(post);
        return post;
    }

    // Delete a post
    static delete(postId, userId) {
        const index = posts.findIndex((post) => post.id == postId && post.userId == userId);
        if (index !== -1) {
          posts.splice(index, 1);
          return true;
        }
        return false;
    }

    // Update a post
    static update(updatedData, userId, postId) {
        const index = posts.findIndex((post) => post.id == postId && post.userId == userId);
        if (index !== -1) {
            Object.keys(updatedData).forEach((key) => {
                posts[index][key] = updatedData[key];
            })
            return true;
        }
        return false;
    }
}

let posts = [
    new PostModel(
        1,
        1,
        "This is a test post",
        "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?size=626&ext=jpg"
    ),
    new PostModel(
        2, 
        2,
        "Star Wars Episode VII - The Force",
        "https://w0.peakpx.com/wallpaper/764/366/HD-wallpaper-star-wars-star-wars-episode-vii-the-force-awakens.jpg"
    ),
    new PostModel(
        3, 
        3,
        "The Hobbit: The Desolation of Smaug 20",
        "https://m.media-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_UY1200_CR90,0,630,1200_AL_.jpg"
    )

]