import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/users.js";
import cartsModel from "../dao/models/carts.js";
import { createHash, isValidPassword } from "../utils.js";
import config from "../config.js";

const { clientID, clientSecret, callbackUrl, jwtSecret} = config;
const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwtCookie"];
  }
  return token;
};

const jwtOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
}

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
            const {first_name, last_name, email, age, role} = req.body;
            const userExists = await userModel.findOne({email: username});

            if(userExists) {
                console.error("User already exists");
                done(null, false);
            }

            const cart = await cartsModel.create({});
            
            const user = {
                first_name,
                last_name,
                email: username,
                password: createHash(password),
                role: role ?? "user",
                cart: cart._id,
            }

            const result = await userModel.create(user);

            done(null, result);
        } catch(error) {
            done(error);
        }
        
      }
    )
  );

  passport.use(
    "jwt",
    new JWTStrategy(jwtOptions, async(jwt_payload, done) => {
    try {
      return done(null, jwt_payload);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;