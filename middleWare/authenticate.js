import jwt from 'jsonwebtoken'
const authenticate = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).send("Access denied. No token provided.");
    const bearerToken = token.split(" ")[1];

    try {
        const decod = jwt.verify(bearerToken, "my seceret key")
        req.body = decod;
        next();
    } catch (error) {
        res.send('Invalid Token')
    }
}

export default authenticate