import express from "express";
import * as rental from "../controllers/rental-page.js"
import { authenticateToken } from "../middleware/authorization.js";


const rentalPageRouter = express.Router();

rentalPageRouter.get('/search?:param', rental.search);
rentalPageRouter.get('/recent-list', rental.recentList);
rentalPageRouter.get("/all", rental.getAllRentals);
rentalPageRouter.get("/:id", rental.getRentalInfo);
rentalPageRouter.get("/:id/all", rental.getUserRentals);
rentalPageRouter.post("/update-status", authenticateToken, rental.updateStatus);
rentalPageRouter.put("/:id", rental.editRentalInfo);

export default rentalPageRouter;