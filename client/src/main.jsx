// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { RestaurantContextProvider } from "./context/RestaurantsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RestaurantContextProvider>
    <Router>
      <div className="container">
        <App />
      </div>
    </Router>
  </RestaurantContextProvider>
);
