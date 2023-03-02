import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";

const AppRouter = () => {
  return localStorage.getItem("isAuth") ? (
    <Routes>
      {privateRoutes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={React.createElement(component)}
        />
      ))}
      <Route path="/login" element={<Navigate to="/" replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
          element={React.createElement(component)}
        />
      ))}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRouter;
