import passport from "passport";
import local from "passport-local";
import userModel from "../dao/models/users.js";
import cartsModel from "../dao/models/carts.js";
import { createHash, isValidPassword } from "../utils.js";
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

  passport.use("login",
   new LocalStrategy({ usernameField: "email" }, async(username, password, done) => {
    try {
      const user = await userModel.findOne({email: username})

      if(!user) {
        console.error("Authentication Error");
        return done(null, false);
      }
      const validPassword = isValidPassword(user, password)
      if(!validPassword) {
      console.error("Incorrect credentials")
      done(null, false)
    } else {
      done(null, user);
    }
    } catch (error) {
      done(error);
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