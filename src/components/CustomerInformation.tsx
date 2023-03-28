import React, { FC } from "react";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import { colorful, gray } from "../design/colors";
import person from "../design/svg/Person.svg";
import google from "../design/svg/Google.svg";
import phone from "../design/svg/Phone.svg";
import instagram from "../design/svg/Instagram.svg";
import viber from "../design/svg/Viber.svg";
import facebook from "../design/svg/Facebook.svg";
import telegram from "../design/svg/Telegram.svg";
import {
  IDelivery,
  IDeliveryToPostOffice,
  IOrder,
} from "../models/bonami-server-response";

interface ICustomerInformation {
  order: IOrder;
}

const CustomerInformation: FC<ICustomerInformation> = ({ order }) => {
  const getGoogleMapsLink = (
    delivery: IDelivery,
    postOffice: IDeliveryToPostOffice | null
  ) => {
    return `https://www.google.com.ua/maps/place/${delivery.country},+${delivery.city},+${delivery.street},+${delivery.address},+${postOffice?.postOfficeNumber},+${postOffice?.deliveryCompanyName}`;
  };

  return (
    <>
      <Card sx={{ width: "371px" }}>
        <Grid container justifyContent={"space-between"}>
          <Grid
            container
            flexDirection={"column"}
            sx={{ width: "unset" }}
            gap={"20px"}
          >
            <Typography fontWeight={700}>Customer</Typography>
            <Grid item>
              <Typography>
                {order.name.firstName} {order.name.secondName}{" "}
                {order.name.patronymic}
              </Typography>
              <Typography>
                {order.amountOfOrders === 1
                  ? `${order.amountOfOrders} order`
                  : `${order.amountOfOrders} orders`}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "unset" }}
          >
            <Box
              borderRadius={"50%"}
              bgcolor={order.isAuthenticated ? colorful.green : colorful.red}
              sx={{ width: "50px", height: "50px", padding: "10px 12px" }}
            >
              <img src={person} alt="" />
            </Box>
            <Typography>
              {order.isAuthenticated ? "Have acc." : "No accnt."}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: gray.default, margin: "25px 0" }} />
        <Typography fontWeight={700} marginBottom={"20px"}>
          Customer information
        </Typography>
        {order.email ? (
          <Grid container gap={"14px"}>
            <img src={google} alt="" />
            <Typography>{order.email}</Typography>
          </Grid>
        ) : (
          <></>
        )}
        {order.phoneNumber ? (
          <Grid container gap={"14px"}>
            <img src={phone} alt="" />
            <Typography>{order.phoneNumber}</Typography>
          </Grid>
        ) : (
          <></>
        )}
        {order.socialMedia ? (
          <>
            {order.socialMedia.instagram ? (
              <Grid container gap={"14px"}>
                <img src={instagram} alt="" />
                <Typography>{order.socialMedia.instagram}</Typography>
              </Grid>
            ) : (
              <></>
            )}
            {order.socialMedia.viber ? (
              <Grid container gap={"14px"}>
                <img src={viber} alt="" />
                <Typography>{order.socialMedia.viber}</Typography>
              </Grid>
            ) : (
              <></>
            )}
            {order.socialMedia.facebook ? (
              <Grid container gap={"14px"}>
                <img src={facebook} alt="" />
                <Typography>{order.socialMedia.facebook}</Typography>
              </Grid>
            ) : (
              <></>
            )}
            {order.socialMedia.telegram ? (
              <Grid container gap={"14px"}>
                <img src={telegram} alt="" />
                <Typography>{order.socialMedia.telegram}</Typography>
              </Grid>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <Divider sx={{ borderColor: gray.default, margin: "25px 0" }} />
        <Typography fontWeight={700} marginBottom={"20px"}>
          Address
        </Typography>
        <Typography>{order.delivery.country || ""}</Typography>
        <Typography>
          {order.delivery.city || ""}, {order.delivery.region || ""}
        </Typography>
        <Typography>{order.delivery.street || ""}</Typography>
        <Typography>{order.delivery.address || ""}</Typography>
        {order.deliveryToPostOffice ? (
          <Typography>
            {order.deliveryToPostOffice.deliveryCompanyName || ""},{" "}
            {order.deliveryToPostOffice.postOfficeNumber || ""}
          </Typography>
        ) : (
          <></>
        )}
        <Typography>{order.delivery.postIndex || ""}</Typography>
        <a
          href={getGoogleMapsLink(order.delivery, order.deliveryToPostOffice)}
          target="_blank"
        >
          <Typography
            color={colorful.lightBlue}
            sx={{ textDecoration: "underline", mt: "15px" }}
          >
            Open in google maps
          </Typography>
        </a>
      </Card>
    </>
  );
};

export default CustomerInformation;
