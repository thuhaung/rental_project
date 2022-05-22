import express from "express";
import * as advertisement from "../controllers/advertisement-page.js";


const advertisementPageRouter = express.Router();

advertisementPageRouter.post("/post", advertisement.newRental);

export default advertisementPageRouter;