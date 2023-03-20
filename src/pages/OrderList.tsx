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

const OrderList = () => {
  const { page } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  const { data: orderList } = useFetchData(
    BonamiController.getOrderList,
    [searchValue, "", "", page],
    [page, searchParam]
  );

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const findButtonHandler = () => {
    setSearchParam(searchValue);
  };

  return (
    <Box p={"32px"}>
      <Card sx={{ width: "100%" }}>
        <Typography sx={{ mb: "25px" }}>Orders</Typography>

        <TextField
          placeholder={"Email..."}
          value={searchValue}
          onChange={searchHandler}
        />
        <Button
          sx={{ display: "block", mt: "18px" }}
          variant="contained"
          onClick={findButtonHandler}
        >
          FIND
        </Button>
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
    </Box>
  );
};

export default OrderList;
