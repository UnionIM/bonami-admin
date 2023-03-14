import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateItem from "../pages/CreateItem";
import ItemList from "../pages/ItemList";
import OrderList from "../pages/OrderList";

export const privateRoutes = [
  { path: "/", component: Home },
  { path: "/item/create", component: CreateItem },
  { path: "/item/list/:page", component: ItemList },
  { path: "/order/list", component: OrderList },
];

export const publicRoutes = [{ path: "login", component: Login }];
