import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductsList from "../pages/Product/ProductPage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import NotFoundPage from "../pages/NotFound/NotFound";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import React from "react";

const BRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/:productId" element={<ProductDetails />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default BRouter;
