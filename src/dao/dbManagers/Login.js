import { loginModel } from "../models/login.model.js";

export class Login {
    constructor(){
        this.model = loginModel;
    }

    find = async () => {
        try {
            const login = await this.model.find().sort({_id:-1}).limit(1);
            console.log(login);
            return login;
        } catch (error) {
            throw new Error(error);
        }
    };

    findId = async (sid) => {
        try {
            const login = await this.model.find({'session': sid}).sort({session:-1}).limit(1);
            console.log(login);
            return login;
        } catch (error) {
            throw new Error(error);
        }
    };

    findByUserId = async (id) => {
        try {
            return await this.model.find({'User_id' : id});
            // return await this.model.sort('User_id' === id);
        } catch (error) {
            throw new Error(error);
        }
    };

    create = async(user) => {
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

}