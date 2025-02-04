import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "./pages/Product/ProductPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import BRouter from "./components/BRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => <BRouter />;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
