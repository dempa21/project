import { apiResponser } from "../traits/ApiResponser.js";

export function authorize(roles) {
    return (req, res, next) => {
        const currentUser = req.session.user;
        const hasPermission = roles.some(role => currentUser.role === role);
        if(!hasPermission) return apiResponser.errorResponse(res, `No tienes permiso para realizar esta acción.`, 400);

        next();
    }
}