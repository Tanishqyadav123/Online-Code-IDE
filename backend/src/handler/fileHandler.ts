import fs from "fs/promises";
import { Socket } from "socket.io";

export const createNewFile = async (filePath: string, socket: Socket) => {
  try {
    await fs.writeFile(filePath, "");

    // Emit the event to socket :-
    socket.emit("new-file", {
      response: "File Created successfully",
    });
  } catch (error) {
    console.log("Unable to create file....");
    throw error;
  }
};

export const readFile = async (filePath: string, socket: Socket) => {
  try {
    const fileContent = await fs.readFile(filePath, {
      encoding: "utf-8",
    });

    // Emit the event to socket :-
    socket.emit("read-file", {
      response: "File read successfully",
      data: fileContent,
    });
  } catch (error) {
    console.log("File not found....");
    throw error;
  }
};

export const updateFile = async (
  filePath: string,
  dataToUpdate: string,
  socket: Socket,
) => {
  try {
    await fs.writeFile(filePath, dataToUpdate);

    // Emit the event to socket :-
    socket.emit("update-file", {
      response: "File updated successfully",
    });
  } catch (error) {
    console.log("File could not write....");
    throw error;
  }
};


export const deleteFile = async (
  filePath: string,
  socket: Socket,
) => {
  try {
    await fs.unlink(filePath);

    // Emit the event to socket :-
    socket.emit("delete-file", {
      response: "File deleted successfully",
    });
  } catch (error) {
    console.log("File could not delete....");
    throw error;
  }
};


// Folder Functions :-

export const createFolder = async (
  filePath: string,
  socket: Socket,
) => {
  try {
    await fs.mkdir(filePath);

    // Emit the event to socket :-
    socket.emit("create-folder", {
      response: "Folder created SuccessFully",
    });
  } catch (error) {
    console.log("Folder could not create...");
    throw error;
  }
};


export const deleteFolder = async (
  filePath: string,
  socket: Socket,
) => {
  try {
    await fs.rmdir(filePath);

    // Emit the event to socket :-
    socket.emit("delete-folder", {
      response: "Folder deleted SuccessFully",
    });
  } catch (error) {
    console.log("Folder could not delete...");
    throw error;
  }
};
