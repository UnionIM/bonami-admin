import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateItem from "../pages/CreateItem";

export const privateRoutes = [
  { path: "/", component: Home },
  { path: "/item/create", component: CreateItem },
];

export const publicRoutes = [{ path: "login", component: Login }];
