import express from "express";
import advertiseController from "../controllers/advertise-page.js";

const router = express.Router();

router.get("/", advertiseController.testRender);

export default router;