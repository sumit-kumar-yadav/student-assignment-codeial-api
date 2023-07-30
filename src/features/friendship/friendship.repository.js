import FriendshipModel from './friendship.model.js';

export default class FriendshipRepository {
    
    async get(user1, user2) { 
        return await FriendshipModel.findOne({sender: user1, receiver: user2})
            || await FriendshipModel.findOne({sender: user2, receiver: user1});
    }

    async getUserFriendships(userId) {
        return await FriendshipModel.find({
            $or: [
                { sender: userId, accepted: true },
                { receiver: userId, accepted: true }
            ]
        })
        .sort({ createdAt: -1 })
        .populate('sender', '_id name email')
        .populate('receiver', '_id name email');
    }

    async getPendingFriendships(userId, request) {
        return (request == 'sent')
                ? await FriendshipModel.find({sender: userId, accepted: false})
                    .sort({ createdAt: -1 })
                    .populate('receiver', '_id name email')

                : await FriendshipModel.find({receiver: userId, accepted: false})
                    .sort({ createdAt: -1 })
                    .populate('sender', '_id name email')
                    
    }

    async addFriend(sender, receiver) {
        return await FriendshipModel.create({sender, receiver});
    }

    async removeFriend(user1, user2) {
        return await FriendshipModel.findOneAndDelete({sender: user1, receiver: user2})
            || await FriendshipModel.findOneAndDelete({sender: user2, receiver: user1});
    }

    async updateFriend(sender, receiver, action) {
        return (action == 'accept')
                ? await FriendshipModel.findOneAndUpdate({sender, receiver}, {accepted: true})
                : await FriendshipModel.findOneAndDelete({sender, receiver})
    }
}