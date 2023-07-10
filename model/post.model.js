import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const postSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  caption: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Types.ObjectId,
      ref: "Comment",
    },
  ],
  likes: [
    {
      type: Types.ObjectId,
      ref: "Like",
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

export default Post;
