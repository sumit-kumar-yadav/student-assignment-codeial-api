export default class PostModel{
    constructor(id, caption, imageUrl){
        this.id = id,
        this.caption = caption,
        this.imageUrl = imageUrl;
    }

    static getAll(){
        return posts;
    }

    static get(id){
        const post = posts.find((post)=> post.id == id);
        return post;
    }

    static add(post){
        post.id = posts.length + 1;
        posts.push(post);
        return post;
    }
}

let posts = [
    new PostModel(
        1,
        "This is a test post",
        "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?size=626&ext=jpg"
    ),
    new PostModel(
        2, 
        "Caption can be added here",
        "https://img.freepik.com/free-photo/bird-colorful-colorful-flowers-generative-ai_206725-752.jpg?size=626&ext=jpg"
    ),
    new PostModel(
        3, 
        "The Hobbit: The Desolation of Smaug 20",
        "https://m.media-amazon.com/images/M/MV5BMzU0NDY0NDEzNV5BMl5BanBnXkFtZTgwOTIxNDU1MDE@._V1_UY1200_CR90,0,630,1200_AL_.jpg"
    ),
    new PostModel(
        4, 
        "Star Wars Episode VII - The Force",
        "https://w0.peakpx.com/wallpaper/764/366/HD-wallpaper-star-wars-star-wars-episode-vii-the-force-awakens.jpg"
    )

]