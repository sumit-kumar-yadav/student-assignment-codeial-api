import Comment from "../model/comment.model.js";

const getCommentsController = async (req, res) => {
  try {
    let comments;

    try {
      comments = await Comment.find({ postId });
    } catch (error) {
      throw new Error("Error retrieving post comments");
    }
    if (!comments || comments.length === 0) {
      res.status(200).send([]);
    } else {
      res.status(200).send(comments);
    }
  } catch (error) {
    res.status(500).send("Error retrieving comments");
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    let isDeleted;

    try {
      const deletedComment = await Comment.findOneAndDelete({
        _id: commentId,
        userId,
      });
      if (!deletedComment) {
        throw new Error("Comment not found");
      }
      isDeleted = true;
    } catch (error) {
      throw new Error("Error deleting comment");
    }

    if (isDeleted) {
      res.status(200).send("Comment is deleted successfully");
    } else {
      res.status(400).send("Comment cannot be deleted");
    }
  } catch (error) {
    res.status(500).send("Error deleting comment");
  }
};

const addCommentController = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const data = {
      userId: req.userId,
      postId,
      content,
    };

    let comment;

    try {
      comment = await Comment.create(data);
    } catch (error) {
      throw new Error("Error creating comment");
    }

    res.status(201).send(comment);
  } catch (error) {
    res.status(500).send("Error creating comment");
  }
};

const updateCommentController = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.userId;

    let comment;

    try {
      comment = await Comment.findById(commentId);
    } catch (error) {
      throw new Error("Error retrieving post comment");
    }

    if (!comment) {
      res.status(400).send("Comment not found");
    }

    const updatedData = {
      content: req.body.content || comment.content,
    };

    let isUpdated;

    try {
      const updatedComment = await Comment.findOneAndUpdate(
        { _id: commentId, userId },
        { $set: updatedData },
        { new: true }
      );
      if (!updatedComment) {
        throw new Error("Comment not found");
      }
      // return updatedComment;
      isUpdated = updatedComment;
    } catch (error) {
      throw new Error("Error updating comment");
    }

    if (isUpdated) {
      res.status(200).send("Comment is updated successfully");
    } else {
      res.status(400).send("Comment cannot be updated");
    }
  } catch (error) {
    res.status(500).send("Error updating comment");
  }
};

export {
  getCommentsController,
  deleteCommentController,
  addCommentController,
  updateCommentController,
};
