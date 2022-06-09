import mongoose from "mongoose";

const forgotPassSchema = mongoose.Schema({
    email: String,
    code: String,
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
});

const ForgotPass = mongoose.model("ForgotPass", forgotPassSchema, "forgotpass");
ForgotPass.createCollection();
export default ForgotPass;