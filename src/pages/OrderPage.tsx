import React from "react";
import { useParams } from "react-router-dom";

const OrderPage = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default OrderPage;
