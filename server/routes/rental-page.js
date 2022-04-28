import express from "express";
import {getRentalPage} from "../controllers/rental-page.js";

const router = express.Router();

router.get("/", getRentalPage);

export default router;