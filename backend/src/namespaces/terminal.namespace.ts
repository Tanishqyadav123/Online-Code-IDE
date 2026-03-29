import { io } from "../index.js";
import {
  createContainer,
  handleExecContainer,
} from "../utils/dockerodeContainer.js";

export function connectToTerminalNamespace() {
  const terminalNamespace = io.of("terminal");

  //   let projectId = "4c7ca709-fb82-47c3-b964-4f6e963aa9f2";
  terminalNamespace.on("connection", async (socket) => {
    console.log("Connected to Terminal Namespace");

    console.log(socket.handshake, "Check this");
    const projectId = socket.handshake.query.projectId as string;

    if (!projectId) {
      console.log("Disconnecting as project Id not found");
      socket.disconnect();
      return;
    }
    // socket.on("terminal-input", (data) => {
    //   console.log("data in terminal", data);

    //   socket.emit("terminal-output", data);
    // });

    // As the user is connected to the terminal Namespace call the function for creating the container :-
    const container = await createContainer({ projectId, socket });

    // console.log("What is the status of container ", container);
    // Handling the Exec into the container :-
    await handleExecContainer({ containerId: container.id, socket });
    // Disconnect
    socket.on("disconnect", () => {
      container.remove({ force: true });
      console.log("Terminal Socket Disconnected successFully");
    });
  });
}
