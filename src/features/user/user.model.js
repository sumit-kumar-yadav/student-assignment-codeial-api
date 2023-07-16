import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"]
  },
  auth_tokens: [
    {
        token: {
            type: String,
            required: true
        }
    }
]

}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;