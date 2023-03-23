import React, { FC } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { IOrderListElement } from "../../../models/bonami-server-response";
import { colorful } from "../../../design/colors";
import deliveredImg from "../../../design/svg/Delivery-delivered.svg";
import pendingImg from "../../../design/svg/Delivery-pending.svg";
import canceledImg from "../../../design/svg/Delivery-canceled.svg";
import telegram from "../../../design/svg/Telegram.svg";
import instagram from "../../../design/svg/Instagram.svg";
import facebook from "../../../design/svg/Facebook.svg";
import google from "../../../design/svg/Google.svg";
import phone from "../../../design/svg/Phone.svg";
import viber from "../../../design/svg/Viber.svg";
import { Link } from "react-router-dom";

interface IOrderCard {
  orderElement: IOrderListElement;
}

const OrderCard: FC<IOrderCard> = ({ orderElement }) => {
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
  const stringSlice = (string: string, maxChars: number = 10) => {
    if (string) {
      return string.length > maxChars
        ? string.slice(0, maxChars) + "..."
        : string;
    } else {
      return "N/A";
    }
  };

  function timeConverter(UNIX_timestamp: number) {
    const date = new Date(UNIX_timestamp);
    const months = [
      "Січ",
      "Лют",
      "Бер",
      "Кві",
      "Тра",
      "Чер",
      "Лип",
      "Січ",
      "Вер",
      "Жов",
      "Лис",
      "Гру",
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return day + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  }

  return (
    <Card>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"50px"}
      >
        <Box
          borderRadius={"50%"}
          bgcolor={statusColor(orderElement.status)}
          sx={{ padding: "10px 8px 0 7px", width: "48px", height: "48px" }}
        >
          <img src={statusImg(orderElement.status)} alt="status" />
        </Box>
        <Typography>{timeConverter(orderElement?.createdAt)}</Typography>
      </Grid>
      <Grid container justifyContent={"space-between"} sx={{ mt: "25px" }}>
        <Grid item>
          <Grid container gap={"5px"}>
            <img src={telegram} alt="tg" />
            <Typography>
              {stringSlice(orderElement.socialMedia?.telegram)}
            </Typography>
          </Grid>
          <Grid container gap={"10px"} sx={{ ml: "4px" }}>
            <img src={facebook} alt="fb" />
            <Typography>
              {stringSlice(orderElement.socialMedia?.facebook)}
            </Typography>
          </Grid>
          <Grid container gap={"5px"}>
            <img src={instagram} alt="in" />
            <Typography>
              {stringSlice(orderElement.socialMedia?.instagram)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container gap={"5px"}>
            <img src={viber} alt="vi" />
            <Typography>
              {stringSlice(orderElement.socialMedia?.viber)}
            </Typography>
          </Grid>
          <Grid container gap={"5px"}>
            <img src={google} alt="em" />
            <Typography>{stringSlice(orderElement?.email)}</Typography>
          </Grid>
          <Grid container gap={"5px"}>
            <img src={phone} alt="ph" />
            <Typography>{stringSlice(orderElement?.phoneNumber)}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          mt: "15px",
          width: "100%",
          height: "25px",
        }}
        component={Link}
        to={`/order/${orderElement._id}`}
      >
        Open order
      </Button>
    </Card>
  );
};

export default OrderCard;
