import { apiResponser } from "../traits/ApiResponser.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { userService } from "../services/index.js";

export function authorize(roles) {
    return async (req, res, next) => {
        // const authHeader = req.headers.authorization;
        // const token = authHeader.split(" ")[1];
        // const verify = jwt.verify(token, config.jwt.secret, {ignoreExpiration: true} );
        // const userId = verify.userId;
        const user1 = req.session.user;
        const userId = user1.id;
        const user = await userService.findById(userId);
        const userRole = user.role;
        const hasPermission = roles.some(role => userRole === role);
        if(!hasPermission) return apiResponser.errorResponse(res, `No tienes permiso para realizar esta acción.`, 400);
        next();
    }
    
}