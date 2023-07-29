import { userModel } from '../models/user.model.js';
import { createHash } from "../../utils.js";

class UserRepository {
    constructor(){
        this.model = userModel;
    }

    findByEmail = async (email) => {
        try {
            return await this.model.findOne({email: email});
        } catch (error) {
            throw new Error(error);
        }
    };

    createUser = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    findById = async(id) => {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    };

    findByCartId = async(cartId) => {
        try {
            return await this.model.findOne({cart: cartId});
        } catch (error) {
            throw new Error(error);
        }
    }

    saveUser = async (user) => {
        try {
            return await this.model.findOneAndUpdate({_id: user._id}, { $set: user });
        } catch (error) {
            throw new Error(error);
        }
    }

    updateUser = async (email, password1) => {
        try {
            let user = await this.model.findOne({email: email});
            console.log(user);
            const filter = { _id: user._id };
            const opts = { new: true}
            // let doc = await this.model.findOneAndUpdate(filter, {$set: {password: password1}}, opts);
            // doc.email;
            // doc.password;
            // console.log(doc);
            // console.log(user.password);
            // console.log(password1);
            let newpassword = createHash(password1);
            return await this.model.updateOne(filter, {$set: {password: newpassword}}, opts);
            
        } catch (error) {
            throw new Error(error);
        }
    }

}


export const userRepository = new UserRepository();