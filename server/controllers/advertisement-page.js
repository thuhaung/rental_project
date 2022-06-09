import Rental from "../models/rental.js";
import { cloudinary } from "../utils/cloudinary.js";
import bucket from "../helper/bucket.js";
import getPublicUrl from "../helper/public-url.js";


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
   // const cookie = new Cookies();
    const userId = req.cookies["userId"];
    console.log(userId);
    const rentalId = req.body.rentalId;
    console.log(rentalId);
    try {
        const files = req.body.images;
        let uploadedResponse;
        for (let i in files) {
            uploadedResponse = await cloudinary.v2.uploader.upload(files[i], {
                public_id: `${rentalId}-image-${i}`,
                folder: `rentals/${userId}/${rentalId}`,
                resource_type: 'image'
            });
            console.log(uploadedResponse);
        }
        res.status(200).send("ok");
    } catch (error) {
        console.log(error.message);
    }
}

/*export const uploadRentalImage = async (req, res) => {
    const cookie = new Cookies();
    const userId = req.cookies["userId"];
    const rentalId = req.body.rentalId;
    
    try {
        const files = req.body.images;
        if (files) {
            for (let i in files) {
                const blob = bucket.file(`${userId}/${rentalId}/${files[i].originalname}`);
                const blobStream = blob.createWriteStream();
                blobStream.on("error", (error) => {
                    console.log(error);
                })
                blobStream.on("finish", () => {
                    const publicUrl = getPublicUrl("rental-project", `${blob.name}`);
                    return blob.makePublic().then(() => {
                        req.file.gcsUrl = publicUrl();
                    });
                });
            }
            res.status(200).send("Uploaded.")
        }
    } catch (error) {
        
    }

}*/

export const getRentalImages = async (req, res) => {
    const rentalId = req.params.rentalid;
    const userId = req.params.userid;
    try {
        const { resources }  = await cloudinary.v2.search.
                                                    expression("folder: rentals/" + userId + "/" + rentalId + "/*").
                                                    sort_by("public_id", "desc").
                                                    execute();
        const publicIds = resources.map(file => file.public_id);
        res.status(200).send(publicIds);
    } catch (error) {
        res.status(500).send(error.message);
    }
}