import { messageService } from "../services/messages.service.js";

export function getMessages() {
    const messages = messageService.getMessages();    
    return messages;
}

export function createMessage() {
    const createdMessage = messageService.createMessage();    
    return createdMessage;
}
