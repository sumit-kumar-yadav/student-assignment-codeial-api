import bcrypt from 'bcrypt';
import OtpRepository from './otp.repository.js';
import { transporter } from '../../configs/nodemailer.js';

export default class OtpController{

    constructor(){
        this.otpRepository = new OtpRepository();
    }

    // Send new OTP to the user's email id
    sendOtp = async (req, res) => {
        try {
            // Check if user exists
            const { email } = req.body;
            const user = await this.otpRepository.getUser(email);
    
            if(!user) return res.status(400).send('User does not exist.');
    
            // Delete the previous created otps, if any
            await this.otpRepository.deleteOtps(user._id);
    
            const otpDoc = await this.otpRepository.createOtp(user._id);
    
            // Mail the created OTP to the user
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Reset password',
                text: `Hi ${user.name}. Your OTP to reset your password is: ${otpDoc.otp}.`,
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    console.log("Error in sending email.", err);
                    return res.status(500).send("Error in sending email.");
                }
                else {
                    console.log('Email sent: ' + info.response);
                    return res.status(201).send("OTP is sent on your email. Please check.");
                }
            });
    
        } catch (err) {
            return res.status(500).send("Server error");
        }
    }

    verifyOtp = async (req, res) => {
        try {
            const { otp, email } = req.body;

            // Check if user exists
            const user = await this.otpRepository.getUser(email);
            if(!user) return res.status(400).send('User does not exist.');

            // Validate the OTP 
            const isValidated = await this.otpRepository.validateOtp(otp, user._id);
            if(!isValidated) return res.status(201).send("Invalid OTP");

            return res.status(201).send("OTP Verified successfully.");
    
        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
    
    resetPassword = async (req, res) => {
        try {
            const { email, new_password, confirm_password } = req.body;

            // Check if user exists
            const user = await this.otpRepository.getUser(email);
            if(!user) return res.status(400).send('User does not exist.');

            // Check if the OTP of the user is validated successfully.
            const isVerified = await this.otpRepository.isOtpVerified(user._id);
            if(!isVerified) return res.status(400).send("OTP is not validated yet.");

            if(new_password != confirm_password) 
                return res.status(400).send(`Password didn't match`);

            // Reset password after encrypting it.
            const password = await bcrypt.hash(new_password, 8);
            await this.otpRepository.updateUserPassword(user._id, password);

            // Delete the otp 
            await this.otpRepository.deleteOtps(user._id);

            return res.status(200).send("Password changed successfully.");

        } catch (err) {
            return res.status(500).send("Server error");
        }
    }
}