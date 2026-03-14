import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { createFolderIfNotExist } from "./utils/createFolder.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a Folder 'Projects' on Bootstraping :-
createFolderIfNotExist("Projects");
app.use(clerkMiddleware({ debug: true }));

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Backend Server is running on the PORT : ${PORT}`);
});
