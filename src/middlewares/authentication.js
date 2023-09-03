import { apiResponser } from "../traits/ApiResponser.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function authentication(redirect = false) {
    return (req, res, next) => {
        // const authHeader = req.headers.authorization;
        // const token = authHeader.split(" ")[1];
        // console.log(token);
        // const verify = jwt.verify(token, config.jwt.secret, {ignoreExpiration: true} );
        // const userId = verify.userId;
        // if(redirect && userId === undefined) return res.redirect('/login');
        const userId = req.session.user;
        if(userId === undefined) return apiResponser.errorResponse(res, `Unauthenticated`, 401);

        next();
    }
}