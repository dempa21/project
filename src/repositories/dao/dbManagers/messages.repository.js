import messagesModel from "../models/messages.js";

class MessageManager {
  constructor() {}

  createMessage = async function (message) {
    try {
      const createdMessage = await messagesModel.create(message);
      return createdMessage;
    } catch (error) {
      console.log(error);
    }
  };

  getMessages = async function () {
    try {
      const messages = await messagesModel.find();
      return messages;
    } catch (error) {
      console.log(error);
    }
  };
}

export const messagesRepository = new MessageManager();