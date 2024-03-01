import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/Product/ProductPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import BRouter from "./components/BRouter";

const App = () => <BRouter />;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
