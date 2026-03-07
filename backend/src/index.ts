import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routes/index.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Backend Server is running on the PORT : ${PORT}`);
});
