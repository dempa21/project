import { sessionService } from "../services/sessions.service.js";

export function getUser(filter) {
    const foundUser = cartsService.getUser(filter);    
    return foundUser;
}

export function register(user) {
    const registeredUser = cartsService.register(user);    
    return registeredUser;
}
