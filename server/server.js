const express = require("express");

const APP = express();
const PORT = 5555;

APP.listen(PORT, () => {
  console.log(`Server is up and listening to port ${PORT}`);
})