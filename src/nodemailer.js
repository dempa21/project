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

        sendSimpleEmail = async({
            from,
            to,
            subject,
            html,
            attachments=[]
            }) => {
            let result = await this.client.sendMail({
                from,
                to,
                subject,
                html,
                attachments});

            console.log(result);
            return result;
    }

}}