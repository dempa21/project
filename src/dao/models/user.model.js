import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    role: {
        type: String,
        default: "user",
        emun: ['user', 'admin', 'premium']
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    last_login: {
        type: Date
    },
    expires_at: {
        type: Date,
    },
    created_at: {
        type: Date
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };