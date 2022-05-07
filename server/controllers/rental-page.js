
import Rental from '../models/rental.js';

export const search = async(req, res) => {
    const {city, district, price, street} = req.query;
    let rentals;

    if(city) {
        rentals = await Rental.find({"address.city" : city});
    }
    else {
        rentals = await Rental.find({"address.city" : "Ho Chi Minh"});
    }

    console.log(rentals.length)

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
        //clarify the input of users
        let clearInputStreet = street.trim().toLowerCase();
        let words = clearInputStreet.split(" ");
        words = words.map((word) => {
            return word[0].toUpperCase() + word.substr(1);
        })
        clearInputStreet = words.join(" ")
        
        rentals = rentals.filter((rental) => {
            return rental.address.street == clearInputStreet;
        })
    }

    res.json(rentals);
}

export const recentList = async (req, res) => {
    const rentals = await Rental.find({});

    let recentList = [];
    for(let i = (rentals.length - 1); i >= (rentals.length - 6); i--) {
        recentList = recentList.concat([rentals[i]]);
    }
    res.json(recentList);
}
