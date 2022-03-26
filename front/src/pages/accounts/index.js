import React from "react";
import LoginRequiredRoute from "utils/LoginRequiredRoute";
import { Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login";
import Signup from "./Signup";

export default function AccountsRoutes() {
  return (
    <Routes>
      <Route element={<LoginRequiredRoute />}>
        <Route path={"/profile"} element={<Profile />} />
      </Route>
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
    </Routes>
  );
}
