import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/Product/ProductPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProductsList />} />
      {/* <Route path="/products/:productId" element={<Product />} /> */}
    </Routes>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
