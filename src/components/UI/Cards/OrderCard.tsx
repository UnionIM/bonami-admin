import React, { FC } from "react";
import { Button, Card, Grid, Typography } from "@mui/material";
import { IOrderListElement } from "../../../models/bonami-server-response";

import telegram from "../../../design/svg/Telegram.svg";
import instagram from "../../../design/svg/Instagram.svg";
import facebook from "../../../design/svg/Facebook.svg";
import google from "../../../design/svg/Google.svg";
import phone from "../../../design/svg/Phone.svg";
import viber from "../../../design/svg/Viber.svg";
import { Link } from "react-router-dom";
import OrderStatus from "../OrderStatus";
import { timeConverter } from "../../../utils/timeConverter";

interface IOrderCard {
  orderElement: IOrderListElement;
}

const OrderCard: FC<IOrderCard> = ({ orderElement }) => {
  const stringSlice = (string: string, maxChars: number = 10) => {
    if (string) {
      return string.length > maxChars
        ? string.slice(0, maxChars) + "..."
        : string;
    } else {
      return "—";
    }
  };

  return (
    <Card>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={"50px"}
      >
        <OrderStatus status={orderElement.status} />
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
        Відкрити замовлення
      </Button>
    </Card>
  );
};

export default OrderCard;
