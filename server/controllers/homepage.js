import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {} from "dotenv/config";


export const getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const userLogin = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user == null) {
        return res.status(400).send("Cannot find user.");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET);
            res.header("auth-token", token);
            return res.status(200).send("Logged in.");
        }
        else {
            return res.send("Incorrect password.");
        }
    } catch(error) {
        res.status(500).send();
    }
}

export const registerUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User();
        for (var key in req.body) {
            user[key] = req.body[key];
        }
        user.password = hashedPassword;
        const newUser = await user.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
