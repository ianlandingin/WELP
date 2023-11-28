import axios from "axios";
// import dotenv from "dotenv";

// const env = dotenv.config();
// const BASEURL =  process.env.BASEURL

export default axios.create({
  baseURL: "http://localhost:5555/api/v1/restaurants"
  
});

