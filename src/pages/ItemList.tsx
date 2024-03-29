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
import useWindowDimensions from "../hooks/useWindowDimensions";

const ItemList = () => {
  const { page } = useParams();
  const { width } = useWindowDimensions();
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
    setSearchParam("");
    setCategoryValue("");
    setCategoryParam("");
  };

  const responsiveWidthHandler = (width: number) => {
    if (width >= 1279) {
      return "1162px";
    } else if (width >= 1083) {
      return "965px";
    } else if (width >= 883) {
      return "768px";
    } else if (width >= 687) {
      return "571px";
    } else {
      return "374px";
    }
  };

  return (
    <Box p={"32px"}>
      <Card sx={{ width: "100%" }}>
        <Typography sx={{ mb: "25px" }}>Товари</Typography>
        <Grid container gap={"10px"}>
          <TextField
            placeholder={"Знайти товар..."}
            value={searchValue}
            onChange={searchHandler}
          />
          <Button variant="contained" onClick={findButtonHandler}>
            ЗНАЙТИ
          </Button>
        </Grid>
        <Grid container gap={"10px"} sx={{ margin: "20px 0" }}>
          {!menuItems ? (
            <Grid
              sx={{ width: "241px", height: "48px" }}
              container
              justifyContent={"center"}
            >
              <CircularProgress />
            </Grid>
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
            ВИБРАТИ
          </Button>
          <Button variant="contained" onClick={clearButtonHandler}>
            ОЧИСТИТИ УСЕ
          </Button>
        </Grid>
        <Typography m={"15px 0"}>
          Усього: {itemList?.totalCount || "...."} товарів
        </Typography>
        <Divider sx={{ borderColor: gray.default }} />
        {itemList ? (
          <Grid
            container
            flexDirection={"column"}
            gap={"35px"}
            m={"35px auto 25px"}
            width={responsiveWidthHandler(width)}
          >
            <Grid
              container
              width={responsiveWidthHandler(width)}
              gap={"20px"}
              m={"0 auto"}
            >
              {itemList.itemList.map((el) => (
                <ItemCard
                  item={el}
                  key={el._id}
                  setOpenSnackbar={setOpenSnackbar}
                />
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
          <Grid
            sx={{ width: "100%", margin: "200px 0" }}
            container
            justifyContent={"center"}
          >
            <CircularProgress />
          </Grid>
        )}
      </Card>
      <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
    </Box>
  );
};

export default ItemList;
