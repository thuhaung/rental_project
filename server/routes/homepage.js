import express from "express";
import authenticateToken from "./authorization.js";
import * as homepage from "../controllers/homepage.js";

const homepageRouter = express.Router();

// test code
homepageRouter.get("/user", authenticateToken, homepage.getUser);
homepageRouter.post("/register", homepage.registerUser);
homepageRouter.post("/login", homepage.userLogin);
homepageRouter.post("/token", homepage.generateNewAccessToken);
homepageRouter.delete("/logout", homepage.userLogout);
homepageRouter.get('/rental')
export default homepageRouter;