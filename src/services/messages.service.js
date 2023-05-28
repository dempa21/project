import { messagesRepository } from "../repositories/dao/dbManagers/messages.repository.js";

class messagesService {
    constructor() {}

    createMessage = async function (message) {
        const createdMessage = messagesRepository.createMessage(message);
        return createdMessage;
    }

    getMessages = async function () {
        const messages = messagesRepository.getMessages();
        return messages;
    }

}

export const messageService = new messagesService();