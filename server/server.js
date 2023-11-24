import express from "express";
import dotenv from "dotenv";

const env = dotenv.config();

const APP = express();

const PORT = process.env.PORT;

APP.listen(PORT, () => {
  console.log(`Server is up and listening to port ${PORT}`);
});
