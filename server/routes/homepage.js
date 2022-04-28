import express from "express";
import homepageController from "../controllers/homepage.js";

const router = express.Router();

router.get("/", homepageController.testRender);

export default router;