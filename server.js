import express from 'express';
import PostRouter from './src/features/post/post.routes.js';

const server = express();
const port = 8000;


server.use('/api/posts', PostRouter);

server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
})


server.listen(port, function(err){
    if (err) console.log(`Error in running the server: ${err}`); 
    else console.log('Server is up and listening on port '+ port);
});