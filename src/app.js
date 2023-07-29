import express from "express";
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import database from './db.js';
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import viewsRouter from './routes/views.router.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import sessionRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocking.router.js';
import config from "./config.js";
import initializePassport from "./auth/passport.js";
import passport from "passport";
import bodyparser from "body-parser";
import MailingService from "./nodemailer.js"; 



const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/", express.static(`${__dirname}/public`));
app.use(morgan("dev"));

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.dbUrl,
        ttl: 120,
    }),
    resave: true,
    saveUninitialized: false,
    secret: config.sessionSecret
}));


app.use(passport.initialize());
app.use(passport.session());
initializePassport();

const httpServer = app.listen(8080, () => {
    console.log(`Server runing at port 8080`);
});

database.connect();

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/mockingproducts", mockingRouter);

app.get('/mail', async (req, res) => {
    let result = await MailingService.sendSimpleEmail({
        from: "demparom@gmail.com",
        to: "demparom@gmail.com",
        subject: "Test mail",
        html: `
        <h1>This is a testing mail</h1>
        `,
        attachments: [{
            filename: "bob-esponja.jpg",
            path: `${ __dirname}/images/bob-esponja.jpg`,
            cid: "esponja"
        }]
    })
 res.send({status: "Sucess", message: "mail sent"});
    
})