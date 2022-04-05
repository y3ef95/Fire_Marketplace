import React from "react";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import { Route, Routes } from "react-router-dom";
import ProductSale from "./ProductSale";
import ProductDetail from "./ProductDetail";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route element={<LoginRequiredRoute />}>
        <Route path={"/products"} element={<ProductSale />} />
      </Route>
      <Route path={"/products/:id"} element={<ProductDetail />} />
    </Routes>
  );
}
