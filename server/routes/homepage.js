import express from "express";
import * as homepage from "../controllers/homepage.js";

const router = express.Router();

// test code
router.get("/user", homepage.getUser);
router.post("/register", homepage.registerUser);
router.post("/login", homepage.userLogin);
//router.post("/user", homepage.postUser);
//router.post("/user/login", homepage.login);

// getting
// creating






export default router;