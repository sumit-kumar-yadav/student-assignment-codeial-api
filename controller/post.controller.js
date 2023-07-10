import Post from "../model/post.model.js";

import ApplicationError from "../middleware/error.handler.middleware.js";

const getAllPostsController = async (req, res) => {
  let posts;

  try {
    posts = await Post.find().populate("comments").populate("likes").exec();
    posts = posts.map((post) => {
      return {
        ...post._doc,
        comments: post.comments.length,
        likes: post.likes.length,
      };
    });

    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send("Error retrieving posts");
  }
};

const getOnePostController = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  let post;

  try {
    post = await Post.findById(postId);
    console.log(post);

    // if (!post) {
    //   throw new ApplicationError("Post not found", 400);
    // }

    post = await post.populate("comments").populate("likes").execPopulate();
    console.log(post);

    res.status(200).send({
      ...post._doc,
      comments: post.comments.length,
      likes: post.likes.length,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Error retrieving post");
    }
  }
};

const getPostsController = async (req, res) => {
  const userId = req.userId;
  try {
    let posts = await Post.find({ userId })
      .populate("comments")
      .populate("likes")
      .exec();

    if (!posts || posts.length === 0) {
      res.status(200).send([]);
    } else {
      posts = posts.map((post) => {
        return {
          ...post._doc,
          comments: post.comments.length,
          likes: post.likes.length,
        };
      });

      res.status(200).send(posts);
    }
  } catch (error) {
    res.status(500).send("Error retrieving user posts");
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  let isDeleted;

  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      userId,
    });
    if (!deletedPost) {
      throw new Error("Post not found");
    }
    isDeleted = true;

    if (isDeleted) {
      res.status(200).send("Post is deleted successfully");
    } else {
      res.status(400).send("Post cannot be deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting post");
  }
};

const addPostController = async (req, res) => {
  const { caption } = req.body;

  const data = {
    userId: req.userId,
    caption,
    imageUrl: req.file.filename,
  };

  let post;

  try {
    post = await Post.create(data);

    await post.save();

    res.status(201).send(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the post" });
  }
};

const updatePostController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  let post;
  try {
    post = await Post.findById(postId);

    if (!post) {
      res.status(400).send("Post not found");
    }

    const updatedData = {
      caption: req.body.caption || post.caption,
      imageUrl: (req.file && req.file.filename) || post.imageUrl,
    };

    let isUpdated;

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, userId },
      { $set: updatedData },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("Post not found");
    }
    isUpdated = updatedPost;

    if (isUpdated) {
      res.status(200).send("Post is updated successfully");
    } else {
      res.status(400).send("Post cannot be updated");
    }
  } catch (error) {
    res.status(500).send("Error updating post");
  }
};

export {
  getAllPostsController,
  getOnePostController,
  getPostsController,
  deletePostController,
  addPostController,
  updatePostController,
};
