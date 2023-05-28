import { sessionsRepository } from "../repositories/dao/dbManagers/sessions.repository.js";

class sessionsService {
    constructor() {}

    getUser = async function (filter) {
        const foundUser = sessionsRepository.getUser(filter);
        return foundUser;
    }

    register = async function (user) {
        const registeredUser = sessionsRepository.register(user);
        return registeredUser;
    }

}

export const sessionService = new sessionsService();