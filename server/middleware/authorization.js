import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import Cookies from "universal-cookie";


export const authenticateToken = (req, res, next) => {
    //const cookies = new Cookies(req.headers.cookie);
    const token = req.cookies["accessToken"];
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

export const authenticateRentalToken = (req, res, next) => {
    //const cookies = new Cookies(req.headers.cookie);
    const token = req.cookies["accessToken"];
    //console.log(token);
    //const authHeader = req.headers["authorization"];
    //const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send("Access denied");
    }
    try {
        const verification = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(verification.is_verified);
        if (verification.is_verified === false) {
            res.status(400).send("User must be verify their government ID to advertise.");
        }
        req.user = verification; 
        next();
    } catch (error) {
        console.log("Token expired");
        res.status(403).send("Access denied");   
    }
    /*
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if(err) {
            console.log("Token expired");
            res.status(403).send("Access denied");   
        }
        if(decodedToken.is_verified === false) {
            res.status(400).send('User must verify to advertise');
        }
        next();
    });*/
}


