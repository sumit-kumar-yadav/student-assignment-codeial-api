import { ApplicationError } from '../../error-handler/applicationError.js';
import FriendshipRepository from './friendship.repository.js';

export default class FriendshipController{

    constructor(){
        this.friendshipRepository = new FriendshipRepository();
    }

    // Fetch all the friends of the user
    getUserFriends = async (req, res) => {
        try {
            const { userId } = req.params;
            const allFriendships = await this.friendshipRepository.getUserFriendships(userId) || [];

            let allFriends = await Promise.all(allFriendships.map((friendship) => (
                (friendship.sender._id == req.userId) 
                    ? friendship.receiver.toJSON()
                    : friendship.sender.toJSON()
            )));

            return res.status(200).send(allFriends);

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    // Fetch all the pending sent/received requests
    pendingRequests = async (req, res) => {
        try {
            let friendships = [];
            let pendingRequests = [];

            if(req.query.request == 'sent') {
                friendships = await this.friendshipRepository.getPendingFriendships(req.userId, 'sent');

                pendingRequests = await Promise.all(friendships.map((friendship) => (
                    friendship.receiver.toJSON()
                )));

            }else {
                friendships = await this.friendshipRepository.getPendingFriendships(req.userId, 'received');

                pendingRequests = await Promise.all(friendships.map((friendship) => (
                    friendship.sender.toJSON()
                )));
            }

            return res.status(200).send(pendingRequests);

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
    
    // Add/Remove existing friendship
    toggleFriendship = async (req, res) => {
        try {
            const { friendId } = req.params;

            if(friendId == req.userId) return res.status(400).send("Cannot add friend.");
            
            let friendship = await this.friendshipRepository.get(req.userId, friendId);

            if(friendship){
                // Remove the friendship
                await this.friendshipRepository.removeFriend(req.userId, friendId);
                return res.status(202).send("You are no longer friend with the user.");

            }else{
                // Create a new one
                const newFriendship = await this.friendshipRepository.addFriend(req.userId, friendId);
                return res.status(201).send(newFriendship);
            }
            
        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    acceptRejectFriendship = async (req, res) => {
        try {
            const { action } = req.query;
            const { friendId } = req.params;

            let isResponded = false;

            if(action == 'accept') 
                isResponded = await this.friendshipRepository.updateFriend(friendId, req.userId, 'accept');
            
            else 
                isResponded = await this.friendshipRepository.updateFriend(friendId, req.userId, 'reject');
            
            if(isResponded) 
                return res.status(200).send(`Request ${action}ed successfully.`);
            else
                return res.status(200).send(`Request can't be ${action}ed.`);

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
    
}