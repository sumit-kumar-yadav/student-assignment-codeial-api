import mongoose from 'mongoose';


const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    is_verified: {
        type: Boolean,
        required: true,
    }
    
},{
    timestamps: true
});

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;