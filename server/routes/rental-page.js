import express from "express";
import * as rental from "../controllers/rental-page.js"


const rentalPageRouter = express.Router();

rentalPageRouter.get('/search?:param', rental.search);
rentalPageRouter.get('/recent-list', rental.recentList);
rentalPageRouter.get("/:id", rental.getRentalInfo);
rentalPageRouter.get("/:id/all", rental.getUserRentals);

export default rentalPageRouter;