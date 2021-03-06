import React from "react";
import { useAppContext } from "store";
import { Outlet, Navigate, useLocation } from "react-router-dom";

export default function LoginRequiredRoute() {
  const {
    store: { isAuthenticated },
  } = useAppContext();
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate replace to="/accounts/login" state={{ from: location }} />;
  }
}
