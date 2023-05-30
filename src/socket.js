import { Server } from "socket.io";
import { messagesRepository } from "./repositories/dao/dbManagers/messages.repository.js";

const socket = {};
//let messages = [];


socket.connect = (httpServer) => {
  socket.io = new Server(httpServer);

  let { io } = socket;

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    // When an user sends a message, it is added to the db
    socket.on("message", async (data) => {
      // messages.push(data);
      await messageManager.createMessage(data);
      let messages = await messagesRepository.getMessages();
      io.emit("messageLogs", messages);
    });

    socket.on("user-autenticated", async (data) => {
      let messages = await messagesRepository.getMessages();
      io.emit("messageLogs", messages);
      socket.broadcast.emit("user-connected", data);
    });
  });
};

export default socket;
