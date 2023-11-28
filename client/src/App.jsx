// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import DetailsPage from "./routes/DetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/restaurants/:id" element={<DetailsPage />} />
        <Route exact path="/restaurants/:id/update" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

export default App;
