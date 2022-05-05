import jwt from "jsonwebtoken";


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Access denied");
    }
    try {
        const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).send("Access denied");   
    }
}

export default authenticateToken;