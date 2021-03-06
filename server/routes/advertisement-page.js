import express from "express";
import * as advertisement from "../controllers/advertisement-page.js";
import { authenticateRentalToken } from '../middleware/authorization.js'
// import { uploadRentalImage } from "../middleware/upload.js";
import multer from "../middleware/multer.js";


const advertisementPageRouter = express.Router();

advertisementPageRouter.post("/post",  advertisement.newRental);
//advertisementPageRouter.post("/upload-image", uploadRentalImage.array("images", 5), advertisement.uploadRentalImage);
advertisementPageRouter.get("/:userid/:rentalid/images", advertisement.getRentalImages);
//advertisementPageRouter.post("/upload-image", authenticateRentalToken, multer.array("images", 5), advertisement.uploadRentalImage);
advertisementPageRouter.post("/upload-image",  advertisement.uploadRentalImage);

export default advertisementPageRouter;