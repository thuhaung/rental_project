import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {} from "dotenv/config";
import RefreshToken from "../models/refreshtoken.js";
import Cookies from "universal-cookie";


export const userLogin = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user == null) {
        return res.status(400).send("Cannot find user.");
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) { // if user exists and password is correct
            // generate access token for authorization
            const token = jwt.sign({_id: user._id, is_verified: user.is_verified}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2d"});
            /*
            // find any refresh tokens from user that hasn't expired
            const existingRefreshToken = await RefreshToken.findOne({user_id: user._id, expiresIn: {$gte: new Date(Date.now())}}); 
            
            // if there are no refresh tokens or they have all expired
            if (!existingRefreshToken) {
            */
                // create a new one for user
            const refreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET);
            const newRefreshToken = new RefreshToken({
                user_id: user._id,
                refreshToken: refreshToken
            });
            newRefreshToken.save(); // save new refresh token to db

            res.cookie("accessToken", token, { origin: "http://localhost:3000" });
            res.cookie("refreshToken", refreshToken, { httpOnly: true });
            res.cookie("isVerified", user.is_verified);
            res.cookie("userId", user._id);
            
            res.status(200).json({accessToken: token, refreshToken: refreshToken, user_id: user._id});
            
            /*
            else {
                return res.status(200).json({accessToken: token, existingRefreshToken: existingRefreshToken.refreshToken});
            }*/
        }
        else {
            return res.status(400).send("Incorrect password.");
        }
    } catch(error) {
        res.status(500).send(error.message);
    }
}


export const generateNewAccessToken = async (req, res) => {
    const cookies = new Cookies();
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
        res.status(401).send("Access denied."); // if refresh token isn't provided
    }
    const token = await RefreshToken.findOne({refreshToken: refreshToken}); // find the refresh token in db
    if (!token) { // can't find
        return res.status(401).send("Access denied. Token doesn't exist.");
    }
    const user = await User.findOne({_id: token.user_id});
    try {
        // generate new access token
        const newAccessToken = jwt.sign({_id: user._id, is_verified: user.is_verified}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "2d"});
        //res.set("accessToken", newAccessToken, { origin: "http://localhost:3000" });
        //console.log("New accessToken: " + cookies.get("accessToken"));
        return res.status(200).send({accessToken: newAccessToken});
    } catch (error) {
        res.status(400).send(error.message);   
    }
} 


export const registerUser = async (req, res) => {
    const email = req.body.email;
    if (User.find({email: email})) {
        res.status(400).send("Email is not unique.");
    }
    else {
        try {
            const salt = await bcrypt.genSalt(); 
            const hashedPassword = await bcrypt.hash(req.body.password, salt); // hash user-provided password with salt
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
}


export const userLogout = async (req, res) => {
    const cookies = new Cookies(req.headers.cookie);
    const refreshToken = cookies.get("refreshToken");
    console.log("Logged out.");
    const token = await RefreshToken.findOne({refreshToken: refreshToken});
    if (!token) {
        res.status(400).send("Token doesn't exist.");
    }
    try {
        await RefreshToken.deleteMany({user_id: token.user_id});
        res.clearCookie("userId");
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.clearCookie("isVerified");
        //res.status(204).send("Logged out.");
        res.end();
    } catch (error) {
        res.status(500).send(error.message);
    }
}
