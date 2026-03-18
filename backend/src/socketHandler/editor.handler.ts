// This will include all the socket handler related to the Editor Namespace :-

import { readFile } from "../handler/fileHandler.js";
import { readFileEventType } from "../interface/socketInterface/editor.interface.js";
import { Socket } from "socket.io";

export const readFileEventHandler = (
  data: readFileEventType,
  socket: Socket,
) => {
  const { filePath } = data;

  if (!filePath) {
    socket.emit("error-read-file", {
      response: "No Path Provided",
      data: null,
    });
    return;
  }

  console.log("Is Reaaching");

  // Call the read file handler :-
  readFile(filePath, socket);
};
