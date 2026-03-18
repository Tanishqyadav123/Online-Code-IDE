import { Socket } from "socket.io";
import { io } from "../index.js";
import { readFileEventType } from "../interface/socketInterface/editor.interface.js";
import { readFile } from "../handler/fileHandler.js";
import { readFileEventHandler } from "../socketHandler/editor.handler.js";

// Creating the namespace for Editor :-
export function connectToEditorNamespace() {
  const editorNamespace = io.of("editor");
  editorNamespace.on("connection", (socket: Socket) => {
    console.log("Socket Connected SuccessFully", socket.id);

    socket.on("recevie-data", (data) => {
      console.log("Data received", data);

      socket.emit("got-it", {
        response: "no need for this data",
      });
    });

    // Event For Read File :-
    socket.on("read-file", (data : readFileEventType) => readFileEventHandler(data , socket));
    socket.on("disconnect", () => {
      console.log("Socket Disconnected successFully");
    });
  });
}
