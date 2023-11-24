import express from "express";
import dotenv from "dotenv";

const env = dotenv.config();
const APP = express();


const PORT = process.env.PORT || 5555;
APP.listen(PORT, () => {
  console.log(`Server is up and listening to port ${PORT}`);
});

// Middleware for parsing body
APP.use(express.json());

// GET all restaurants
APP.get("/api/v1/restaurants", async (request, response) => {
  try {
    response.status(200).json({
      name: "Shakey's",
      location: "Malate",
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Get a restaurant
APP.get("/api/v1/restaurants/:restaurant_id", (request, response) => {
  try {
    // response.status(200).json({
    //   name: "Tropical Hut",
    //   location: "Malate",
    // });
    console.log(request.params);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Add a restaurant to database
APP.post("/api/v1/restaurants", async (request, response) => {
  try {
    // response.status(200).json({
    //   status: "success",
    //   message: "Malate",
    // });
    console.log(request.body.name);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Update restaurant details
APP.put("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    response.status(200).json({
      name: "Tropical Hut",
      location: "Malate",
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});

// Delete a restaurant
APP.delete("/api/v1/restaurants/:restaurant_id", async (request, response) => {
  try {
    response.status(200).json({
      name: "Tropical Hut",
      location: "Malate",
    });
  } catch (error) {
    response.status(500).send(error.message);
  }
});
