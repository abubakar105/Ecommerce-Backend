import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) return res.status(401).send("Access denied. No token provided.");
    const bearerToken = token.split(" ")[1];
    try {
        const decod = jwt.verify(bearerToken, "my seceret key", (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
        req.body = decod;
    } catch (error) {
        res.send('Invalid Token')
    }
};


export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json("You are not allowed to do that!");
        }
    });
};