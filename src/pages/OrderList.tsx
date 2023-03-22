import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Pagination,
  PaginationItem,
  TextField,
  Typography,
} from "@mui/material";
import { gray } from "../design/colors";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { Link, useParams } from "react-router-dom";
import OrderCard from "../components/UI/Cards/OrderCard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { IAlertState } from "../models/bonami-client";
import MyAlert from "../components/UI/MyAlert";

const OrderList = () => {
  const { page } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const [dateStart, setDateStart] = useState<Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);

  const [datePickerError, setDatePicketError] = useState<IAlertState>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const { data: orderList } = useFetchData(
    BonamiController.getOrderList,
    [searchParam, dateStart, dateEnd, page],
    [page, searchParam, dateStart, dateEnd]
  );

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const findButtonHandler = () => {
    setSearchParam(searchValue);
  };

  const dateStartHandler = (newValue: Dayjs | null) => {
    if (newValue && dateEnd && dateEnd < newValue) {
      setDatePicketError({
        isOpen: true,
        message: "First date bigger than second",
        severity: "error",
      });
      setDateEnd(null);
    } else {
      setDateStart(newValue);
    }
  };

  const dateEndHandler = (newValue: Dayjs | null) => {
    if (newValue && dateStart && dateStart > newValue) {
      setDatePicketError({
        isOpen: true,
        message: "First date bigger than second",
        severity: "error",
      });
      setDateEnd(null);
    } else {
      //@ts-ignore
      const date = newValue?.$d;
      const date23_59_59 = new Date(date.valueOf() + 86400 * 1000 - 1000);
      setDateEnd(dayjs(date23_59_59));
    }
  };

  const clearDateHandler = () => {
    setDateStart(null);
    setDateEnd(null);
  };

  return (
    <Box p={"32px"}>
      <Card sx={{ width: "100%" }}>
        <Typography sx={{ mb: "25px" }}>Orders</Typography>
        <Grid container gap={"15px"}>
          <TextField
            placeholder={"Email..."}
            value={searchValue}
            onChange={searchHandler}
          />
          <Button variant="contained" onClick={findButtonHandler}>
            FIND
          </Button>
        </Grid>
        <Grid
          sx={{ mt: "25px" }}
          container
          gap={"15px"}
          flexDirection={"column"}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "240px" }}
              label={"Date start"}
              value={dateStart}
              onChange={dateStartHandler}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "240px" }}
              label={"Date end"}
              value={dateEnd}
              onChange={dateEndHandler}
            />
          </LocalizationProvider>
          <Button
            sx={{ width: "240px" }}
            variant="contained"
            onClick={clearDateHandler}
          >
            CLEAR
          </Button>
        </Grid>
        <Divider sx={{ borderColor: gray.default, mt: "20px" }} />
        {orderList ? (
          <Grid
            container
            flexDirection={"column"}
            gap={"35px"}
            m={"35px 0 25px"}
          >
            <Grid container justifyContent={"space-between"} gap={"20px"}>
              {orderList.orderList.map((el) => (
                <OrderCard key={el._id} orderElement={el} />
              ))}
            </Grid>
            <Pagination
              sx={{ m: "0 auto" }}
              page={parseInt(page || "1")}
              count={Math.ceil(orderList.totalCount / 12)}
              renderItem={(order) => (
                <PaginationItem
                  component={Link}
                  to={`/order/list/${order.page}`}
                  {...order}
                />
              )}
            />
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Card>
      <MyAlert state={datePickerError} setState={setDatePicketError} />
    </Box>
  );
};

export default OrderList;
