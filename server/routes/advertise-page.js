import express from "express";
import {getAdvertisePage} from "../controllers/advertise-page.js";

const router = express.Router();

router.get("/", getAdvertisePage);

export default router;