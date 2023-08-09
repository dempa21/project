import mongoose from "mongoose";

const loginCollection = "login_data";
const loginSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    role: {
        type: String,
        required: true,
    },
    last_login: {
        type: Date,
        required: true,
    },
    session: {
        type: String,
        required: true
    }
});


const loginModel = mongoose.model(loginCollection, loginSchema);
export { loginModel };