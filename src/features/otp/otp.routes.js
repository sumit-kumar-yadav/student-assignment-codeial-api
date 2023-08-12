import express from 'express';
import OtpController from './otp.controller.js';

const router = express.Router();

const otpController = new OtpController();

router.post('/send', otpController.sendOtp);
router.post('/verify', otpController.verifyOtp);
router.post('/reset-password', otpController.resetPassword);

export default router;
