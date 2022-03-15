import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "components/Header";
import Signup from "./Signup";
import Login from "./Login";

export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
