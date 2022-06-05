import mongoose from "mongoose";

const confirmationCodeSchema = mongoose.Schema({
    user_id: String,
    code: String,
    createdAt: { 
        type: Date, 
        default: Date.now()
    },
});

const ConfirmationCode = mongoose.model("ConfirmationCode", confirmationCodeSchema, "confirmationcode");
ConfirmationCode.createCollection();
export default ConfirmationCode;