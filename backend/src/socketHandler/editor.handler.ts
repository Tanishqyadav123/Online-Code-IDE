// This will include all the socket handler related to the Editor Namespace :-

import {
  createNewFile,
  deleteFile,
  readFile,
  updateFile,
} from "../handler/fileHandler.js";
import {
  createFileEventType,
  deleteFileEventType,
  editFileEventType,
  readFileEventType,
} from "../interface/socketInterface/editor.interface.js";
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

  console.log("read File Event Data ", data);
  // Call the read file handler :-
  readFile(filePath, socket);
};

export const editFileEventHandler = (
  data: editFileEventType,
  socket: Socket,
) => {
  const { filePath, content } = data;

  console.log("Edit File Event Data ", data);

  if (!filePath) {
    socket.emit("error-read-file", {
      response: "No Path Provided",
      data: null,
    });
    return;
  }

  // Call the update file handler :-
  updateFile(filePath, content, socket);
};

export const deleteFileEventHandler = (
  data: deleteFileEventType,
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

  // Call the delete file handler :-
  console.log("Data is for deletion", filePath);
  deleteFile(filePath, socket);
};

export const createFileEventHandler = (
  data: createFileEventType,
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

  // Call the create file handler :-
  console.log("Data is for creation of file ", filePath);
  createNewFile(filePath, socket);
};
