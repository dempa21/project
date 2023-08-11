import { apiResponser } from "../traits/ApiResponser.js";
import session from "express-session";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function authentication(redirect = false) {
    return (req, res, next) => {
        const cookie = req.cookie;
        console.log(req.headers);
        console.log(cookie);
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const token = authHeader.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, config.jwt.secret, {ignoreExpiration: true} );
        const userId = verify.userId;
        if(redirect && userId === undefined) return res.redirect('/login');
        if(userId === undefined) return apiResponser.errorResponse(res, `Unauthenticated`, 401);

        next();
    }
}




