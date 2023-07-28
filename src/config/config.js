import dotenv from 'dotenv';
dotenv.config();

export const config = {

    mongo: 
    { url: process.env.DB_URL },
    jwt: {
    cookieName: process.env.JWT_COOKIE_NAME,
    sessionSecret: process.env.SESSION_SECRET,
    },
    nodeMailer: {
        service: process.env.SERVICE,
        port: process.env.PORT,
        user: process.env.USER,
        password: process.env.PASSWORD
    },
    github: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackUrl: process.env.CALLBACK_URL,
    },
    
    
};

export default config;