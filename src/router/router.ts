import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateItem from "../pages/CreateItem";
import ItemList from "../pages/ItemList";
import OrderList from "../pages/OrderList";
import EditItem from "../pages/EditItem";
import OrderPage from "../pages/OrderPage";

export const privateRoutes = [
  { path: "/", component: Home },
  { path: "/item/create", component: CreateItem },
  { path: "/item/list/:page", component: ItemList },
  { path: "/item/edit/:id", component: EditItem },
  { path: "/order/list/:page", component: OrderList },
  { path: "/order/:id", component: OrderPage },
];

export const publicRoutes = [{ path: "login", component: Login }];
