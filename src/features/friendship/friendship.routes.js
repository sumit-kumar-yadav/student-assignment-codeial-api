import express from 'express';
import FriendshipController from './friendship.controller.js';

const router = express.Router();

const friendshipController = new FriendshipController();

router.get('/get-friends/:userId', friendshipController.getUserFriends);
router.get('/get-pending-requests', friendshipController.pendingRequests);
router.get('/toggle-friendship/:friendId', friendshipController.toggleFriendship);
router.get('/response-to-request/:friendId', friendshipController.acceptRejectFriendship);

export default router;
