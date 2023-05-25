import { Router } from "express";
import SessionManager from "../dao/dbManagers/sessions.js";
import CartManager from "../dao/dbManagers/carts.js";
import passport from "passport";

const router = Router();
const sessionManager = new SessionManager();
const cartManager = new CartManager();

router.post(
  "/register",
   passport.authenticate("register", {
    failureRedirect: "/api/sessions/failRegister"}),
    async (req, res) => {
    return res.send({ status: "sucess", message: "user registered" });
  }
);

router.get("/failRegister", (req, res) => {
return res.send({ status: "error", message: "User already exists"});
});

router.post("/login",
passport.authenticate("login", {
  failureRedirect: "/api/sessions/failLogin"
}),
 async (req, res) => {
  // try {
  //   const { email, password } = req.body;
  //   const user = await sessionManager.getUser({ email, password });

  //   if (!user) {
  //     return res
  //       .status(401)
  //       .send({ status: "error", error: "Incorrect credentials" });
  //   }

    const user = req.user;

    console.log(req.user);

    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: user.role,
      cart: user.cart,
    };

    return res.send({
      status: "sucess",
      message: "Logged In",
      payload: req.session.user,
    });
  // } catch (error) {
  //   console.log(error);
  // }
});

router.get("/failLogin", (req,res) => {
return res.send({status: "error", error: "Invalid credentials"});
})

router.get("/current", (req, res) => {
  return res.send({payload: req.session.user});
})

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err)
      return res.send({ status: "sucess", message: "logout sucessful" });

    return res.send({ status: "error", message: err });
  });
});

export default router;
