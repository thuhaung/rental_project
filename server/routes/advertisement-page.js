import express from "express";
import * as advertisement from "../controllers/advertisement-page.js";
import { authenticateRentalToken } from '../middleware/authorization.js'
import { uploadRentalImage } from "../middleware/upload.js";


const advertisementPageRouter = express.Router();

advertisementPageRouter.post("/post", authenticateRentalToken, advertisement.newRental);
//advertisementPageRouter.post("/upload-image", uploadRentalImage.array("images", 5), advertisement.uploadRentalImage);
advertisementPageRouter.post("/images", advertisement.getRentalImages);
advertisementPageRouter.post("/upload-image", authenticateRentalToken, advertisement.uploadRentalImage);

export default advertisementPageRouter;