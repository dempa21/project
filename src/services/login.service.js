import { loginRepository, userRepository } from "../repositories/index.js";


export class LoginService {
    constructor() {
        this.repository = loginRepository;
        this.userRepository = userRepository;
    }

    
    updateLogin = async (user) => {
        this.repository.saveUserLogin(user);
    }

    find = async () => {
        this.repository.find();
    }

    findId = async (sid) => {
        this.repository.findId(sid);
    }

    }
