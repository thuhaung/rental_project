import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
    user_id: String,
    expiresIn: {
        type: Date,
        default: new Date(Date.now() + 24*60*60*7*1000)
    },
    refreshToken: String
});

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema, "refreshtoken");
RefreshToken.createCollection();
export default RefreshToken;