import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (token == null) {
        return res.status(401).send("Access denied");
    }
    try {
        const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");   
    }
}

export default authenticateToken;