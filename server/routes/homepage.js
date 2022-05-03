import express from "express";
import * as homepage from "../controllers/homepage.js";

const router = express.Router();
router.use(express.json());

// test code
router.get("/user", homepage.authenticateToken, homepage.getUser);
router.post("/user", homepage.postUser);
router.post("/user/login", homepage.login);


export default router;