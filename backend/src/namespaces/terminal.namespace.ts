import { io } from "../index.js";

export function connectToTerminalNamespace() {
  const terminalNamespace = io.of("terminal");

  terminalNamespace.on("connection", (socket) => {
    console.log("Connected to Terminal Namespace");

    socket.on("terminal-input", (data) => {
      console.log("data in terminal", data);

      socket.emit("terminal-output", data);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Terminal Socket Disconnected successFully");
    });
  });
}
