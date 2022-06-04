import express from "express";
import {authenticateToken} from "../middleware/authorization.js";
import * as userInfo from "../controllers/user-info.js";

const userInfoRouter = express.Router();

userInfoRouter.get("/", authenticateToken, userInfo.getUser);
userInfoRouter.get("/confirm-email", authenticateToken,  userInfo.sendEmail);
userInfoRouter.post("/confirm-email/verify", authenticateToken, userInfo.verifyUser);
userInfoRouter.get("/:id", userInfo.getUserGeneralInfo);


export default userInfoRouter;