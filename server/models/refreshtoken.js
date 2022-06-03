import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    user_id: String,
    refreshToken: String
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema, "refreshtoken");
RefreshToken.createCollection();
export default RefreshToken;