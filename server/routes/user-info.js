import express from "express";
import {authenticateToken} from "../middleware/authorization.js";
import * as userInfo from "../controllers/user-info.js";

const userInfoRouter = express.Router();

userInfoRouter.get("/", authenticateToken, userInfo.getUser);
userInfoRouter.get("/confirm-email", authenticateToken,  userInfo.sendEmail);
userInfoRouter.post("/confirm-email/verify", authenticateToken, userInfo.verifyUser);
userInfoRouter.post("/save-rentals", authenticateToken, userInfo.saveRentals);
userInfoRouter.post("/remove-saved-rentals", authenticateToken, userInfo.removeSavedRentals);
userInfoRouter.get("/:id", userInfo.getUserGeneralInfo);
userInfoRouter.put("/:id", userInfo.editUserInfo);
userInfoRouter.put("/password/:id", userInfo.editUserPassword);


export default userInfoRouter;