import React, { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import canceledImg from "../../design/svg/Delivery-canceled.svg";
import deliveredImg from "../../design/svg/Delivery-delivered.svg";
import pendingImg from "../../design/svg/Delivery-pending.svg";
import { colorful } from "../../design/colors";

interface IOrderStatus {
  status: "pending" | "canceled" | "delivered";
}

const OrderStatus: FC<IOrderStatus> = ({ status }) => {
  const statusColor = (status: "pending" | "canceled" | "delivered") => {
    switch (status) {
      case "canceled":
        return colorful.red;
      case "delivered":
        return colorful.green;
      case "pending":
        return colorful.yellow;
    }
  };
  const statusImg = (status: "pending" | "canceled" | "delivered") => {
    switch (status) {
      case "canceled":
        return canceledImg;
      case "delivered":
        return deliveredImg;
      case "pending":
        return pendingImg;
    }
  };
  const statusMessage = (status: "pending" | "canceled" | "delivered") => {
    switch (status) {
      case "canceled":
        return "Відмінено";
      case "delivered":
        return "Доставлено";
      case "pending":
        return "Очікує";
    }
  };

  return (
    <Grid container alignItems={"center"} gap={"10px"} sx={{ width: "unset" }}>
      <Box
        borderRadius={"50%"}
        bgcolor={statusColor(status)}
        sx={{ padding: "10px 8px 0 7px", width: "48px", height: "48px" }}
      >
        <img src={statusImg(status)} alt={status} />
      </Box>
      <Typography
        fontWeight={700}
        sx={{ textTransform: "capitalize", width: "60px" }}
      >
        {statusMessage(status)}
      </Typography>
    </Grid>
  );
};

export default OrderStatus;
