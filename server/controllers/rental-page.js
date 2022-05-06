
import Rental from '../models/rental.js';
import {} from "dotenv/config";

export const search = async(req, res) => {
    // let user = req.query.user;
    // rent = Number(rent);
    console.log(typeof req.query.user)
    Rental.find({"address.district": "4","address.city" : "Ho Chi Minh"}, (err, rentals) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.json(rentals)
        }
    })
    
}
