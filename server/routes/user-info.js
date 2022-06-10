import express from "express";
import {authenticateToken} from "../middleware/authorization.js";
import * as userInfo from "../controllers/user-info.js";

const userInfoRouter = express.Router();

userInfoRouter.get("/", authenticateToken, userInfo.getUser);
userInfoRouter.get("/confirm-email", authenticateToken,  userInfo.sendEmail);
userInfoRouter.post("/confirm-email/verify", authenticateToken, userInfo.verifyUser);
userInfoRouter.post("/save-rentals", authenticateToken, userInfo.saveRentals);
userInfoRouter.post("/remove-saved-rentals", authenticateToken, userInfo.removeSavedRentals);
userInfoRouter.get("/saved-rentals/all", authenticateToken, userInfo.getSavedRentals);
userInfoRouter.get("/:id", userInfo.getUserGeneralInfo);
userInfoRouter.put("/:id", authenticateToken, userInfo.editUserInfo);
userInfoRouter.post("/password/recover", userInfo.forgotPassword);
userInfoRouter.post("/password/recover/verify", userInfo.verifyCode);
userInfoRouter.post("/password/recover/new-password", userInfo.resetPassword);
userInfoRouter.put("/password/:id", authenticateToken, userInfo.editUserPassword);


export default userInfoRouter;