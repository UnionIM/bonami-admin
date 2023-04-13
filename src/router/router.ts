import Login from "../pages/Login";
import Home from "../pages/Home";
import CreateItem from "../pages/CreateItem";
import ItemList from "../pages/ItemList";
import OrderList from "../pages/OrderList";
import OrderPage from "../pages/OrderPage";
import ReviewsPage from "../pages/ReviewsPage";

export const privateRoutes = [
  { path: "/", component: Home },
  { path: "/item/create", component: CreateItem },
  { path: "/item/list/:page", component: ItemList },
  { path: "/item/edit/:id", component: CreateItem },
  { path: "/order/list/:page", component: OrderList },
  { path: "/order/:id", component: OrderPage },
  { path: "/item/reviews/:id", component: ReviewsPage },
];

export const publicRoutes = [{ path: "login", component: Login }];
