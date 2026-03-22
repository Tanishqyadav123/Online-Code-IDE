import { Socket } from "socket.io";
import { io } from "../index.js";
import {
  editFileEventType,
  readFileEventType,
  deleteFileEventType,
  createFileEventType,
} from "../interface/socketInterface/editor.interface.js";
import {
  editFileEventHandler,
  readFileEventHandler,
  deleteFileEventHandler,
  createFileEventHandler,
} from "../socketHandler/editor.handler.js";

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
    socket.on("read-file", (data: readFileEventType) =>
      readFileEventHandler(data, socket),
    );

    // Event For Edit File :-
    socket.on("edit-file", (data: editFileEventType) =>
      editFileEventHandler(data, socket),
    );

    // Event For Delete File :-
    socket.on("delete-file", (data: deleteFileEventType) =>
      deleteFileEventHandler(data, socket),
    );

    // Event For Create New file :-
    socket.on("new-file", (data : createFileEventType) => createFileEventHandler(data, socket));
    socket.on("disconnect", () => {
      console.log("Socket Disconnected successFully");
    });
  });
}
