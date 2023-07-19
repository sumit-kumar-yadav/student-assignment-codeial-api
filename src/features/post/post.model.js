import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;