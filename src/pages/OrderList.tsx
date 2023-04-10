import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { gray } from "../design/colors";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { Link, useParams } from "react-router-dom";
import OrderCard from "../components/UI/Cards/OrderCard";
import { Dayjs } from "dayjs";
import { IAlertState } from "../models/bonami-client";
import MyAlert from "../components/UI/MyAlert";
import useWindowDimensions from "../hooks/useWindowDimensions";
import RangeDatePicker from "../components/UI/Inputs/RangeDatePicker";

const OrderList = () => {
  const { page } = useParams();
  const { width } = useWindowDimensions();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const [dateStart, setDateStart] = useState<Dayjs | null>(null);
  const [dateEnd, setDateEnd] = useState<Dayjs | null>(null);

  const [sort, setSort] = useState<{ element: string; direction: 1 | -1 }>({
    element: "status",
    direction: -1,
  });

  const [openSnackBar, setOpenSnackBar] = useState<IAlertState>({
    isOpen: false,
    message: "",
    severity: "error",
  });

  const { data: orderList, message } = useFetchData(
    BonamiController.getOrderList,
    [searchParam, dateStart, dateEnd, sort, page],
    [page, searchParam, dateStart, dateEnd, sort]
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
  }, [message]);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const findButtonHandler = () => {
    setSearchParam(searchValue);
  };

  const handleSortSelect = (e: SelectChangeEvent) => {
    setSort(JSON.parse(e.target.value));
  };

  const responsiveWidthHandler = (width: number) => {
    if (width >= 1487) {
      return "1369px";
    } else if (width >= 1135) {
      return "1021px";
    } else if (width >= 791) {
      return "677px";
    } else {
      return "329px";
    }
  };

  const selectSortMenuItems = [
    {
      value: { element: "status", direction: -1 },
      name: "Status pending first",
    },
    {
      value: { element: "status", direction: 1 },
      name: "Status canceled first",
    },
    {
      value: { element: "createdAt", direction: -1 },
      name: "Newest first",
    },
    {
      value: { element: "createdAt", direction: 1 },
      name: "Latest first",
    },
  ];

  return (
    <Box p={"32px"}>
      <Card sx={{ width: "100%" }}>
        <Typography sx={{ mb: "25px" }}>Orders</Typography>
        <Grid
          container
          justifyContent={"space-between"}
          sx={{ width: "unset" }}
        >
          <Grid
            container
            flexDirection={"column"}
            sx={{ width: "unset" }}
            gap={"15px"}
            marginBottom={"32px"}
          >
            <Grid container gap={"15px"} sx={{ width: "unset" }}>
              <TextField
                placeholder={"Email..."}
                value={searchValue}
                onChange={searchHandler}
              />
              <Button variant="contained" onClick={findButtonHandler}>
                FIND
              </Button>
            </Grid>
            <Select
              sx={{ width: "241px" }}
              value={JSON.stringify(sort)}
              onChange={handleSortSelect}
            >
              {selectSortMenuItems.map((el) => (
                <MenuItem
                  key={JSON.stringify(el.value)}
                  value={JSON.stringify(el.value)}
                >
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <RangeDatePicker
            dateEnd={dateEnd}
            dateStart={dateStart}
            setDateEnd={setDateEnd}
            setDateStart={setDateStart}
            setOpenSnackBar={setOpenSnackBar}
          />
        </Grid>
        <Divider sx={{ borderColor: gray.default, mt: "20px" }} />
        {orderList ? (
          <Grid
            container
            flexDirection={"column"}
            gap={"35px"}
            m={"35px auto 25px"}
            width={responsiveWidthHandler(width)}
          >
            <Grid container gap={"20px"} width={responsiveWidthHandler(width)}>
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
      <MyAlert state={openSnackBar} setState={setOpenSnackBar} />
    </Box>
  );
};

export default OrderList;
