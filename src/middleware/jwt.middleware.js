import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(token, 'jwt_secret_key');
        req.userID = payload.userID;

    } catch (err) {
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    next();
};

export default jwtAuth;