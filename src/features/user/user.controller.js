import UserRepository from './user.repository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signUp = async (req, res) => {
        const { name, email, password, gender } = req.body;

        const userData = {
            name,
            email,
            password: await bcrypt.hash(password, 8),
            gender
        }

        const user = await this.userRepository.signup(userData);

        res.status(201).send(user);
    }

    signIn = async (req, res) => {
        const { email, password, } = req.body;

        const user = await this.userRepository.signin(email, password);

        if (!user) {
            return res.status(400).send('Incorrect Credentials');
        } 
        else {
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            );

            // Store the token in auth_tokens array to store all the sessions
            await this.userRepository.saveSession(token, user);

            return res.status(200).send(token);
        }
    }

    logout = async (req, res) => {
        try {
    
            await this.userRepository.logout(req.userId, req.token);
    
            return res.status(200).send("Loggod out successfully");
    
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }
    
    logoutAllDevices = async (req, res) => {
        try {
    
            await this.userRepository.logoutAllDevices(req.userId);
    
            return res.status(200).send("Loggod out from all devices successfully");
    
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error");
        }
    }
}
