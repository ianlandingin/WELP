import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

import restaurantRoutes from "./routes/restaurantRoutes.js";

const env = dotenv.config();
const APP = express();

// Morgan middleware
APP.use(morgan("dev"));

// Custom middleware
APP.use((request, response, next) => {
  console.log("Custom middleware ran");
  next();
});

const PORT = process.env.PORT || 5555;
APP.listen(PORT, () => {
  console.log(`Server is up and listening to port ${PORT}`);
});

// Middleware for parsing body
APP.use(express.json());

APP.use("/api/v1/restaurants", restaurantRoutes);
