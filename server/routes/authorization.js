import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";


const authenticateToken = (req, res, next) => {
    const cookies = new Cookies(req.headers.cookie);
    console.log(req.headers.cookie);
    const token = cookies.get("accessToken");
    //console.log(token);
    //const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Access denied");
    }
    try {
        const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //console.log("ye ok in authorization");
        req.user = verification; 
        next();
    } catch (error) {
        console.log("Token expired");
        res.status(403).send("Access denied");   
    }
}

export default authenticateToken;