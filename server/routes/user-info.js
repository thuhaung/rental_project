import express from "express";
import {authenticateToken} from "../middleware/authorization.js";
import * as userInfo from "../controllers/user-info.js";

const userInfoRouter = express.Router();

userInfoRouter.get("/", authenticateToken, userInfo.getUser);

export default userInfoRouter;