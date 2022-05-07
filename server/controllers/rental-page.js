
import Rental from '../models/rental.js';
import {} from "dotenv/config";

export const search = async(req, res) => {
    const {city, district, price, street} = req.query;
    let rentals;

    if(city) {
        rentals = await Rental.find({"address.city" : city});
    }
    else {
        rentals = await Rental.find({"address.city" : "Ho Chi Minh"});
    }

    console.log(rentals)

    if(district) {
        rentals = rentals.filter((rental) => {
            return rental.address.district == district;
        })
    }

    if(price) {
        rentals = rentals.filter((rental) => {
            return rental.rent <= price
        })
    }

    if(street) {
        rentals = rentals.filter((rental) => {
            return rental.address.street == street
        })
    }

    res.json(rentals);
    
}
