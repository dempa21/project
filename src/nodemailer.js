import mailer from 'nodemailer';
import { config } from './config/config.js';

const {nodemailer: {service, port, user, password}} = config;

export default class MailingService {
    constructor() {
        this.client = mailer.createTransport({
            service,
            port,
            auth: {
                user,
                pass: password
            }
        });

    //     sendSimpleEmail = async({
    //         from,
    //         to,
    //         subject,
    //         html,
    //         attachments=[]
    //         }) => {
    //         let result = await this.client.sendMail({
    //             from,
    //             to,
    //             subject,
    //             html,
    //             attachments});

    //         console.log(result);
    //         return result;
    // }

        let from = "demparom@gmail.com";
        let to = email;
        let subject = "reestablecer contraseña";
        let html = `
        <h1>Correo de recuperación de contraseña</h1>
        `

     sendSimpleEmail = async (email) => ({
            from,
            to = email,
            subject,
            html,
            }) => {
            let result = this.client.sendMail({
                from,
                to,
                subject,
                html});

            console.log(result);
            return result;
    }

}}