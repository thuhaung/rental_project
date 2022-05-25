import Cookies from "universal-cookie";
import Rental from "../models/rental.js";

export const newRental = async (req, res) => {
    try {
        const rental = new Rental();
        for (var key in req.body) {
            rental[key] = req.body[key];
        }
        const newRental = await rental.save();
        res.status(201).send(newRental._id);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

export const uploadRentalImage = async (req, res) => {
    const cookie = new Cookies(req.header.cookies);
    console.log(cookie.get("userId"));
    res.status(200).send("Uploaded successfully.");
}

