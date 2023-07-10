import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const likeSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);

export default Like;
