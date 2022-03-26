import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "components/Header";
import AccountsRoutes from "./accounts";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/accounts/*" element={<AccountsRoutes />} />
      </Route>
    </Routes>
  );
}
