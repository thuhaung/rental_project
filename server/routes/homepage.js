import express from "express";
import {getHomepage} from "../controllers/homepage.js";

const router = express.Router();

router.get("/", getHomepage);

export default router;