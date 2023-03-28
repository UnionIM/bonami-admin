import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
  Divider,
  AlertColor,
  Pagination,
  PaginationItem,
} from "@mui/material";
import useCategoryMenuItems from "../hooks/useCategoryMenuItems";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import MyAlert from "../components/UI/MyAlert";
import { gray } from "../design/colors";
import { Link, useParams } from "react-router-dom";
import { IItemList } from "../models/bonami-server-response";
import ItemCard from "../components/UI/Cards/ItemCard";

const ItemList = () => {
  const { page } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [categoryParam, setCategoryParam] = useState<string>("");
  const [itemList, setItemList] = useState<IItemList | null>();
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const { data } = useFetchData(
    BonamiController.getItemList,
    [searchParam, categoryParam, parseInt(page || "1")],
    [searchParam, categoryParam, parseInt(page || "1")]
  );
  useEffect(() => {
    setItemList(data);
  }, [data]);

  const { data: categories, message: categoriesErrorMessage } = useFetchData(
    BonamiController.getCategories
  );

  const menuItems = useCategoryMenuItems(
    setOpenSnackbar,
    categories,
    categoriesErrorMessage
  );

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const categoryHandler = (e: SelectChangeEvent) => {
    setCategoryValue(e.target.value as string);
  };

  const findButtonHandler = () => {
    setSearchParam(searchValue);
  };

  const selectButtonHandler = () => {
    setCategoryParam(categoryValue);
  };
  const clearButtonHandler = () => {
    setSearchValue("");
    setCategoryParam("");
  };

  return (
    <Box p={"32px"}>
      <Card sx={{ width: "100%" }}>
        <Typography sx={{ mb: "25px" }}>Item manager</Typography>
        <Grid container gap={"10px"}>
          <TextField
            placeholder={"Search item..."}
            value={searchValue}
            onChange={searchHandler}
          />
          <Button variant="contained" onClick={findButtonHandler}>
            FIND
          </Button>
        </Grid>
        <Grid container gap={"10px"} sx={{ margin: "20px 0" }}>
          {!menuItems ? (
            <CircularProgress />
          ) : (
            <div style={{ width: "241px" }}>
              <Select
                value={categoryValue}
                onChange={categoryHandler}
                sx={{ width: "241px" }}
              >
                {menuItems.map((el) => (
                  <MenuItem key={el.value} value={el.value}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          )}
          <Button variant="contained" onClick={selectButtonHandler}>
            SELECT
          </Button>
          <Button variant="contained" onClick={clearButtonHandler}>
            CLEAR
          </Button>
        </Grid>
        <Divider sx={{ borderColor: gray.default }} />
        {itemList ? (
          <Grid
            container
            flexDirection={"column"}
            gap={"35px"}
            m={"35px 0 25px"}
          >
            <Grid container justifyContent={"space-between"} gap={"20px"}>
              {itemList.itemList.map((el) => (
                <ItemCard item={el} setOpenSnackbar={setOpenSnackbar} />
              ))}
            </Grid>
            <Pagination
              sx={{ m: "0 auto" }}
              page={parseInt(page || "1")}
              count={Math.ceil(itemList.totalCount / 12)}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/item/list/${item.page}`}
                  {...item}
                />
              )}
            />
          </Grid>
        ) : (
          <CircularProgress />
        )}
      </Card>
      <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
    </Box>
  );
};

export default ItemList;
