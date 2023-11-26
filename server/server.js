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
    const results = await client.query("SELECT * FROM restaurants");
    response.status(200).json({
      results: results.rows.length,
      restaurants: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Get a restaurant
APP.get("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    const results = await client.query(
      "SELECT * FROM restaurants WHERE id=$1 LIMIT 1",
      [request.params.restaurant_id]
    );
    response.status(200).json({
      results: results.rows.length,
      data: { restaurants: results.rows[0] },
    });
    // console.log(request.params.restaurant_id);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a restaurant to database
APP.post("/api/v1/restaurants", async (request, response) => {
  try {
    const results = await client.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ( $1, $2, $3) RETURNING *",
      [request.body.name, request.body.location, request.body.price_range]
    );
    response.status(200).json({
      status: "Success",
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update restaurant details
APP.put("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    const results = await client.query(
      "UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1 RETURNING *",
      [
        request.params.restaurant_id,
        request.body.name,
        request.body.location,
        request.body.price_range,
      ]
    );
    response.status(200).json({
      status: "Success",
      data: {
        restaurant: results.rows,
      },
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a restaurant
APP.delete("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    const results = await client.query(
      "DELETE FROM restaurants WHERE id = $1 RETURNING *",
      [request.params.restaurant_id]
    );
    response.status(204).json({
      status: "success",
      deleted_restaurant: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});
