import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "../pages/Product/ProductPage";
import ProductDetails from "./ProductDetails/ProductDetails";

import React from "react";

const BRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/:productId" element={<ProductDetails />} />
    </Routes>
  );
};

export default BRouter;
