import OtpModel from './like.model.js';
import UserModel from '../user/user.model.js';

export default class OtpRepository {
    
    async getUser(email){
        return  await UserModel.findOne({ email });
    }

    async deleteOtps(userId){
        return await OtpModel.deleteMany({ user: userId });
    }

    async createOtp(userId){
        // 6 digit otp
        const otp = Math.random().toString().substr(2, 6);

        return await OtpModel.create({
            user: userId,
            otp,
            is_verified: false
        });
    }
    
    async validateOtp (otp, userId) {
        await OtpModel.findOneAndUpdate({ otp, user: userId }, { is_verified: true });
    }

    async isOtpVerified(userId){
        return await OtpModel.findOne({ user: userId, is_verified: true });
    }

    async updateUserPassword(userId, password){
        await UserModel.findByIdAndUpdate(userId, { password });
    }

}