require("dotenv").config();

const express = require("express");

const APP = express();

port = process.env.PORT;

APP.listen(port, () => {
  console.log(`Server is up and listening to port ${port}`);
});
