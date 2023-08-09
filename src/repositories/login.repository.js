import { login } from "./../dao/dbManagers/index.js";

export class LoginRepository {
    constructor(){
        this.manager = login;
    }

    saveUserLogin = async (user) => {
        try {
            return await this.manager.create(user);
        } catch (error) {
            throw new Error(error);
        }
    };

    find = async () => {
        try {
            return await this.manager.find();
        } catch (error) {
            throw new Error(error);
        }
    };

    findId = async (sid) => {
        try {
            return await this.manager.findId(sid);
        } catch (error) {
            throw new Error(error);
        }
    };


}