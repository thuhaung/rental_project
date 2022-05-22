import express from "express";
import * as advertisement from "../controllers/advertisement-page.js";
import {authenticateRentalToken} from '../middleware/authorization.js'


const advertisementPageRouter = express.Router();

advertisementPageRouter.post("/post", authenticateRentalToken, advertisement.newRental);

export default advertisementPageRouter;