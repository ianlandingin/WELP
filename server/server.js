import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import client from "./db/index.js";

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

// GET all restaurants
APP.get("/api/v1/restaurants", async (request, response) => {
  try {
    await client.query(`SELECT * FROM restaurants`, (err, res) => {
      if (!err) {
        response.status(200).json(res.rows);
      } else {
        response.status(500).send(err.message);
      }
      client.end();
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Get a restaurant
APP.get("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    await client.query(
      `SELECT * FROM restaurants WHERE id=${request.params.restaurant_id} LIMIT 1`,
      (err, res) => {
        if (!err) {
          console.log(res.rows[0]);
          response.status(200).send(res.rows[0]);
        } else {
          response.status(500).send(err.message);
        }
        client.end();
      }
    );
    // console.log(request.params.restaurant_id);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a restaurant to database
APP.post("/api/v1/restaurants", async (request, response) => {
  try {
    console.log(request.body);
    response.status(200).json({
      status: "success",
      data: {
        restaurant: "Shakey's",
      },
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update restaurant details
APP.put("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    console.log(request.params);
    console.log(request.body);
    response.status(200).json({
      status: "success",
      data: {
        restaurant: "Shakey's",
      },
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a restaurant
APP.delete("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    console.log(request.params);
    response.status(204).json({
      status: "success",
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});
