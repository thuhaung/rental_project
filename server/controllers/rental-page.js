import Rental from '../models/rental.js';

export const search = async(req, res) => {
    const {city, district, price, street} = req.query;
    let rentals;

    if (city) {
        rentals = await Rental.find({"address.city" : city});
    }
    else {
        rentals = await Rental.find({"address.city" : "Ho Chi Minh City"});
    }

    if (district) {
        rentals = rentals.filter((rental) => {
            return rental.address.district === district;
        })
    }

    if (price > 0) {
        rentals = rentals.filter((rental) => {
            return rental.rent <= price
        })
    }

    if (street) {
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

export const getRentalInfo = async (req, res) => {
    const rentalId = req.params.id;
    try {
        const rental = await Rental.findById({_id: rentalId});
        if (rental) {
            res.status(200).send(rental);
        }
    } catch (error) {
        res.send(error.message);
    }
}

export const getUserRentals = async (req, res) => {
    const userId = req.params.id;
    try {
        const rentals = await Rental.find({user: userId});
        res.status(200).send(rentals);
    } catch (error) {
        res.send(error.message);
    }
}


export const updateStatus = async (req, res) => {
    const rentalId = req.body.rentalId;
    if (rentalId) {
        try {
            await Rental.findByIdAndUpdate(rentalId, {is_available: false});
            res.status(200).send("Updated.");
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}