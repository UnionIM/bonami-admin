import React from "react";
import { Routes, Route } from "react-router-dom";
import { router } from "./router";

const AppRouter = () => {
  return (
    <Routes>
      {router.map(({ path, component }) => {
        return (
          <Route
            key={path}
            path={path}
            element={React.createElement(component)}
          />
        );
      })}
    </Routes>
  );
};

export default AppRouter;
