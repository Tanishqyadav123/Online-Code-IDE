import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { createFolderIfNotExist } from "./utils/createFolder.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToEditorNamespace } from "./namespaces/editor.namespace.js";
import { connectToTerminalNamespace } from "./namespaces/terminal.namespace.js";

const app = express();
const server = createServer(app);

// Creating the socket Io server to handle socket request :-
export const io = new Server(server);

// Connected to Editor Namespace :-
connectToEditorNamespace();
connectToTerminalNamespace();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a Folder 'Projects' on Bootstraping :-
createFolderIfNotExist("Projects");
app.use(clerkMiddleware({ debug: true }));

app.use("/api/v1", router);

server.listen(PORT, () => {
  console.log(`Backend Server is running on the PORT : ${PORT}`);
});
