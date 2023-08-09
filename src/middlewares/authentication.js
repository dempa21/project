import { apiResponser } from "../traits/ApiResponser.js";
import session from "express-session";

export function authentication(redirect = false) {
    return async (req, res, next) => {
        if(redirect && !req.session.user) return res.redirect('/login');
        if(!req.session.user) return apiResponser.errorResponse(res, `Unauthenticated`, 401);

        next();
    }
}




