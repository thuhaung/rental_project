import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";

const users = [{
    name: "Ha",
    password: "123"
},
{
    name: "Duy",
    password: "456"
}]

export const getUser = (req, res) => {
    res.json(users.filter(user => user.name == req.user.name));
}

export const postUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = {
            name: req.body.name,
            password: hashedPassword
        };
        users.push(user);
        res.status(201).send("User added.")
    } catch(error) {
        res.send(error.message);
    }
    
}

export const login = async (req, res) => {
    const user = users.find(user => user.name == req.body.name);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken});

}

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
        return res.status(401).send();
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send();
        }
        req.user = user;
        next();
    });

}



/*
if (user == null) {
        return res.status(400).send("Cannot find user.");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).send("Logged in.");
        }
        else {
            return res.send("Incorrect password.");
        }
    } catch(error) {
        res.status(500).send();
    }


*/