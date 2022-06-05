import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import ConfirmationCode from "../models/confirmationcode.js";
import nodemailer from "nodemailer";
import {} from "dotenv/config";

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.user._id});
        res.status(200).json({user: user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUserGeneralInfo = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findOne({_id: userId});
        const info = {
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            is_verified: user.is_verified,
            total_ratings: user.total_ratings,
            rating_count: user.rating_count,
        }
        res.status(200).send(info);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const sendEmail = async (req, res) => {
    const userId = req.cookies["userId"];
    const token = crypto.randomBytes(20).toString("hex");

    await ConfirmationCode.deleteMany({user_id: userId});
    const entry = new ConfirmationCode({user_id: userId, code: token});
    const newEntry = await entry.save();

    const transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "thuha.ung01@gmail.com",
          pass: "rlwxcdgdatqflrlz",
        },
    });

    try {
        await transport.sendMail({
            from: "thuha.ung01@gmail.com",
            to: "thu.ha2897@gmail.com",
            subject: "Casa Email Verification",
            html: `<h1>Email Confirmation</h1>
                <h2>Hello,</h2>
                <p>Thank you for using our site. Please confirm your email by using this code.</p>
                <h2>${token}</h2>
                </div>`,
        });
        res.status(200).send("Email sent.");
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const verifyUser = async (req, res) => {
    const userId = req.cookies["userId"];
    const confirmationCode = req.body.confirmationCode;
    try {
        const entry = await ConfirmationCode.find({user_id: userId, code: confirmationCode});
        
        if (entry) {
            await ConfirmationCode.deleteMany({user_id: userId});
            await User.findByIdAndUpdate(userId, {is_verified: true});
            res.cookie("isVerified", true);
            res.status(200).send("User is verified.");
        }
        else {
            res.status(400).send("Bad request.");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const editUserInfo = async (req, res) => {
    const userId = req.params.id;
    console.log(req.cookies["userId"]);
    console.log(req.body);
    try {
        User.findOneAndUpdate({"_id" : userId}, req.body)
            .then(async() => {
                const updatedUser = await User.findById({_id : userId});
                res.status(200).send(updatedUser);
            }) ;
    } catch (error) {
        res.status(500).send(error);
    }
}

export const editUserPassword = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    try {
        if (await bcrypt.compare(req.body.currentPassword, user.password)) {
            try {
                const salt = await bcrypt.genSalt(); 
                const hashedPassword = await bcrypt.hash(req.body.newPassword, salt); // hash user-provided password with salt
                // const user = new User();
                // for (var key in req.body) {
                //     user[key] = req.body[key];
                // }
                // user.password = hashedPassword;
                // const newUser = await user.save();
                // res.status(201).send(newUser);
                try {
                    User.findOneAndUpdate({_id : user._id}, {password : hashedPassword})
                        .then(() => {
                            res.status(200).send("Update successfully");
                        })
                } catch (error) {
                    res.status(500).send("Update failed");
                }
            } catch (error) {
                res.status(400).json({message: error.message});
            }
        }
        else {
            res.status(500).send("Password does not match");
        }
    } catch (error) {
        res.status(500).send(error);
    }
}