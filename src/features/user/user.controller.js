import UserModel from './user.model.js';
import jwt from 'jsonwebtoken';

export default class UserController {

    signUp(req, res) {
        const { name, email, password, } = req.body;

        const user = UserModel.signUp(name, email, password);

        res.status(201).send(user);
    }

    signIn(req, res) {
        const { email, password, } = req.body;

        const user = UserModel.signIn(email, password);

        if (!user) {
            return res.status(400).send('Incorrect Credentials');
        } 
        else {
            const token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                },
                'jwt_secret_key',
                {
                    expiresIn: '1h',
                }
            );

            return res.status(200).send(token);
        }
    }
}
