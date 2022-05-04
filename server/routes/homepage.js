import express from "express";
import authenticateToken from "./authorization.js";
import * as homepage from "../controllers/homepage.js";

const router = express.Router();

// test code
router.get("/user", authenticateToken, homepage.getUser);
router.post("/register", homepage.registerUser);
router.post("/login", homepage.userLogin);
router.post("/token", homepage.generateNewAccessToken);
router.delete("/logout", homepage.userLogout);
export default router;