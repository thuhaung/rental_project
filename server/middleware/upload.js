import multer from "multer";
import Cookies from "universal-cookie";
import fs from "fs";

const rentalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const cookies = new Cookies(req.headers.cookie);
        const userId = cookies.get("userId");
        console.log(req.body.rentalId);
        const path = `../server/images/rentals/${userId}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const cookies = new Cookies(req.headers.cookie);
        const userId = cookies.get("userId");
        console.log(req.body.rentalId);
        cb(null, req.body.rentalId + "-" + file.originalname);
    }
});

export const uploadRentalImage = multer({ storage: rentalStorage });