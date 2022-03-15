import React from "react";
import { useAppContext } from "store";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function LoginRequiredRoute() {
  const {
    store: { isAuthenticated },
  } = useAppContext();
  const location = useLocation();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }
}
