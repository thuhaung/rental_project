import express from "express";
import rentalPageController from "../controllers/rental-page.js";

const router = express.Router();

router.get("/", rentalPageController.testRender);

export default router;