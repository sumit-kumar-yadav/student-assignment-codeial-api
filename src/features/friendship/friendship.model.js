import mongoose from 'mongoose';


const friendshipSchema = new mongoose.Schema({
    // the user who sent this request
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // the user who accepted this request
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
        required: true,
    }
},{
    timestamps: true
});

const Friendship = mongoose.model('Friendship', friendshipSchema);
export default Friendship;