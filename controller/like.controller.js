import Like from "../model/like.model.js";

const getLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    let likes;

    try {
      likes = await Like.find({ postId });
    } catch (error) {
      throw new Error("Error retrieving post likes");
    }

    if (!likes || likes.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(likes);
    }
  } catch (error) {
    res.status(500).send("Error retrieving likes");
  }
};

const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.userId;

    let likeExists;

    try {
      likeExists = await Like.findOne({ postId, userId });
    } catch (error) {
      throw new Error("Error retrieving post like");
    }

    if (likeExists) {
      let isDeleted = false;

      try {
        const deletedLike = await Like.findOneAndDelete({
          postId,
          userId,
        });
        if (!deletedLike) {
          throw new Error("Like not found");
        }
        isDeleted = true;
      } catch (error) {
        throw new Error("Error deleting like");
      }

      if (isDeleted) {
        res.status(200).send("Like is deleted successfully");
      } else {
        res.status(400).send("Like cannot be deleted");
      }
    } else {
      const data = {
        userId,
        postId,
      };

      let like;

      try {
        like = await Like.create(data);
      } catch (error) {
        throw new Error("Error creating like");
      }

      res.status(201).send(like);
    }
  } catch (error) {
    res.status(500).send("Error toggling like");
  }
};

export { getLikes, toggleLike };
