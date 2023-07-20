import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // this defines the object id of the liked object - Post / Comment
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'on_model'
    },
    on_model: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel;