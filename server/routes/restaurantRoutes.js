import express from "express";
import client from "../db/index.js";
const ROUTER = express.Router();

// GET all restaurants
ROUTER.get("/", async (request, response) => {
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
ROUTER.get("/:restaurant_id", async (request, response) => {
  try {
    const results = await client.query(
      "SELECT * FROM restaurants WHERE id=$1 LIMIT 1",
      [request.params.restaurant_id]
    );
    response.status(200).json({
      results: results.rows.length,
      restaurant: results.rows[0],
    });
    // console.log(request.params.restaurant_id);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a restaurant to database
ROUTER.post("/", async (request, response) => {
  try {
    const results = await client.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ( $1, $2, $3) RETURNING *",
      [request.body.name, request.body.location, request.body.price_range]
    );
    response.status(200).json({
      status: "Success",
      restaurant: results.rows[0],
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update restaurant details
ROUTER.put("/:restaurant_id", async (request, response) => {
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
      restaurant: results.rows,
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a restaurant
ROUTER.delete("/:restaurant_id", async (request, response) => {
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

export default ROUTER;
