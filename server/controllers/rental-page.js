import Rental from '../models/rental.js';
import { cloudinary } from "../utils/cloudinary.js";


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

    rentals = rentals.filter((rental) => {
        return rental.is_available;
    })

    res.status(200).json(rentals);
}

export const recentList = async (req, res) => {
    try {
        let rentals = await Rental.find({});

        rentals = rentals.filter((rental) => {
            return rental.is_available;
        });

        let recentList = [];

        if (rentals.length >= 6) {
            for (let i = (rentals.length - 1); i >= (rentals.length - 6); i--) {
                recentList = recentList.concat([rentals[i]]);
            }
        }
        else {
            for (let i = (rentals.length - 1); i >= 0; i--) {
                recentList = recentList.concat([rentals[i]]);
            }
        }
        
        res.status(200).json(recentList);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export const getRentalInfo = async (req, res) => {
    const rentalId = req.params.id;
    try {
        const rental = await Rental.findById({_id: rentalId});
        if (rental) {
            res.status(200).send(rental);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getUserRentals = async (req, res) => {
    const userId = req.params.id;
    try {
        const rentals = await Rental.find({user: userId});
        res.status(200).send(rentals);
    } catch (error) {
        res.status(500).send(error.message);
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

export const getAllRentals = async (req, res) => {
    try {
        let rentals = await Rental.find({});
        rentals = rentals.filter((rental) => {
            return rental.is_available;
        });
        res.status(200).json(rentals);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

// export const editRentalInfo = async (req, res) => {
//     const rentalId = req.params.id;
//     const userId = req.cookies["userId"];
//     try {
//         const files = req.body.addImages;
//         let uploadedResponse;
//         for (let i in files) {
//             uploadedResponse = await cloudinary.v2.uploader.upload(files[i], {
//                 public_id: `${rentalId}-image-${i}`,
//                 folder: `rentals/${userId}/${rentalId}`,
//                 resource_type: 'image'
//             });
//             console.log(uploadedResponse);
//         }
//     } catch (error) {
//         console.log(error.message);
//     }

//     try {
//         const files = req.body.deleteImages;
//         let deletedResponse;
//         for (let i in files) {
//             deletedResponse = await cloudinary.v2.uploader.destroy(files[i]);
//             console.log(deletedResponse);
//         }
//     } catch (error) {
//         console.log(error.message);
//     }
    

// }