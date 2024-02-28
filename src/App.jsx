import React from "react";
import ReactDOM from "react-dom";
import Product from "./pages/ProductPage";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <div>
    <Product />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
