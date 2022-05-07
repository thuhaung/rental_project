import express from "express";
import * as rental from "../controllers/rental-page.js"


const rentalPageRouter = express.Router();

rentalPageRouter.get('/search?:param', rental.search)
rentalPageRouter.get('/search/recent-list', rental.recentList)
rentalPageRouter.get("/", (req, res) => {res.send('Lmao')});

export default rentalPageRouter;