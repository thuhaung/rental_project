import express from "express";
import authenticateToken from "./authorization.js";
import * as homepage from "../controllers/homepage.js";

const homepageRouter = express.Router();

// test code
homepageRouter.post("/register", homepage.registerUser);
homepageRouter.post("/login", homepage.userLogin);
homepageRouter.post("/refresh", homepage.generateNewAccessToken);
homepageRouter.delete("/logout", authenticateToken, homepage.userLogout);

export default homepageRouter;