import Rental from "../models/rental.js";

export const newRental = async (req, res) => {
    try {
        const rental = new Rental();
        for (var key in req.body) {
            rental[key] = req.body[key];
        }
        const newRental = await rental.save();
        res.status(201).send(newRental);
    } catch (error) {
        res.status(400).send({message: error.message});
    }
}

