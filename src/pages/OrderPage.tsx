import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MyAlert from "../components/UI/MyAlert";
import { IAlertState } from "../models/bonami-client";
import person from "../design/svg/Person.svg";
import { colorful, gray } from "../design/colors";

const OrderPage = () => {
  const { id } = useParams();

  const [openSnackBar, setOpenSnackBar] = useState<IAlertState>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const {
    data: order,

    message,
  } = useFetchData(BonamiController.getOrderById, [id], [id]);

  useEffect(() => {
    //@ts-ignore
    if (message?.code === "ERR_NETWORK") {
      setOpenSnackBar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
    if (order?.message === "CastError") {
      setOpenSnackBar({
        isOpen: true,
        message: "Wrong id",
        severity: "error",
      });
    }
  }, [message]);

  return (
    <Box p={"32px"}>
      {order && !order.message ? (
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
                  bgcolor={
                    order.isAuthenticated ? colorful.green : colorful.red
                  }
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
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
      <MyAlert state={openSnackBar} setState={setOpenSnackBar} />
    </Box>
  );
};

export default OrderPage;
