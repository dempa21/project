import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.js";
import cartsModel from "../dao/models/carts.js";
import { createHash } from "../utils.js";
import config from "../config.js";

const { clientID, clientSecret, callbackUrl} = config;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {

        try {
            const userExists = await userModel.findOne({email: username});
            const {first_name, last_name, role} = req.body;

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
                cartId: cart._id,
            }

            const result = await userModel.create(user);

            done(null, result);
        } catch(error) {
            done(error);
        }
        
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;