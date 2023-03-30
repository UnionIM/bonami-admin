import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import MyAlert from "../components/UI/MyAlert";
import { IAlertState } from "../models/bonami-client";
import { gray } from "../design/colors";
import CustomerInformation from "../components/CustomerInformation";
import OrderStatus from "../components/UI/OrderStatus";
import { timeConverter } from "../utils/timeConverter";
import ItemInOrderList from "../components/ItemInOrderList";
import cross from "../design/svg/Cross.svg";
import check from "../design/svg/Check.svg";
import { IOrderedItem } from "../models/bonami-server-response";
import BonamiService from "../services/BonamiService";

const OrderPage = () => {
  const { id } = useParams();

  const [openSnackBar, setOpenSnackBar] = useState<IAlertState>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const { data: order, message } = useFetchData(
    BonamiController.getOrderById,
    [id],
    [id]
  );

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

  const getTotalPrice = (items: IOrderedItem[]) => {
    return items.reduce((acc, val) => acc + val.price * val.amount, 0);
  };

  const handleMarkAsDelivered = async () => {
    if (order) {
      await BonamiService.changeOrderStatus(
        order._id,
        "delivered",
        setOpenSnackBar
      );
    } else {
      setOpenSnackBar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
  };
  const handleMarkAsCanceled = async () => {
    if (order) {
      await BonamiService.changeOrderStatus(
        order._id,
        "canceled",
        setOpenSnackBar
      );
    } else {
      setOpenSnackBar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
  };
  const handleMarkAsPending = async () => {
    if (order) {
      await BonamiService.changeOrderStatus(
        order._id,
        "pending",
        setOpenSnackBar
      );
    } else {
      setOpenSnackBar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
  };

  return (
    <Box p={"32px"} display={"flex"}>
      <div style={{ margin: "0 auto" }}>
        {order && !order.message ? (
          <>
            <Grid container gap={"25px"} sx={{ width: "unset" }}>
              <Grid
                container
                gap={"25px"}
                flexDirection={"column"}
                sx={{ width: "unset" }}
              >
                <Card sx={{ height: "693px", maxWidth: "660px" }}>
                  <Grid
                    container
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Grid item>
                      <Grid container alignItems={"center"} gap={"15px"}>
                        <OrderStatus status={order.status} />
                        <Typography
                          fontWeight={700}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {order.status}
                        </Typography>
                      </Grid>
                      <Typography color={gray.dark} sx={{ mt: "10px" }}>
                        {timeConverter(order.createdAt)}
                      </Typography>
                    </Grid>
                    <Grid container gap={"10px"} sx={{ width: "unset" }}>
                      {order.status === "pending" ? (
                        <>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsDelivered}
                          >
                            MARK AS DELIVERED
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsCanceled}
                          >
                            MARK AS CANCELED
                          </Button>
                        </>
                      ) : order.status === "delivered" ? (
                        <>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsPending}
                          >
                            MARK AS PENDING
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsCanceled}
                          >
                            MARK AS CANCELED
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsPending}
                          >
                            MARK AS PENDING
                          </Button>
                          <Button
                            variant="contained"
                            onClick={handleMarkAsDelivered}
                          >
                            MARK AS DELIVERED
                          </Button>
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{ borderColor: gray.default, margin: "25px 0" }}
                  />
                  <ItemInOrderList items={order.items}></ItemInOrderList>
                </Card>
                <Card sx={{ width: "655px" }}>
                  <Grid container alignItems={"center"} gap={"12px"}>
                    <img src={order.isPaid ? check : cross} alt="" />
                    <Typography fontWeight={700}>
                      {order.isPaid ? "Paid" : "Not paid"}
                    </Typography>
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      sx={{ width: "84%", textAlign: "right" }}
                    >
                      <Typography>Total</Typography>
                      <Typography>{getTotalPrice(order.items)}</Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <CustomerInformation order={order} />
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
        <MyAlert state={openSnackBar} setState={setOpenSnackBar} />
      </div>
    </Box>
  );
};

export default OrderPage;
