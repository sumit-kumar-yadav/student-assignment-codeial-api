import express from 'express';
import jwtAuth from './src/middleware/jwt.middleware.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import userRouter from './src/features/user/user.route.js';

const server = express();
const port = 8000;

server.use(express.json());

server.use('/api/users', userRouter);
server.use('/api/posts', jwtAuth, postRouter);
server.use('/api/comments', jwtAuth, commentRouter);
server.use('/api/likes', jwtAuth, likeRouter);

server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})


server.listen(port, function(err){
    if (err) console.log(`Error in running the server: ${err}`); 
    else console.log('Server is up and listening on port '+ port);
});