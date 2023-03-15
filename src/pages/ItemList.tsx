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
  styled,
  ButtonProps,
  AlertColor,
  Pagination,
  PaginationItem,
} from "@mui/material";
import useCategoryMenuItems from "../hooks/useCategoryMenuItems";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import MyAlert from "../components/UI/MyAlert";
import { colorful, gray } from "../design/colors";
import { Delete, EditOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import BonamiService from "../services/BonamiService";
import { IItemList } from "../models/bonami-server-response";

const ItemList = () => {
  const { page } = useParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [itemList, setItemList] = useState<IItemList | null>();
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const { data, message } = useFetchData(
    BonamiController.getItemList,
    [searchParam, parseInt(page || "1")],
    [searchParam, parseInt(page || "1")]
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
    console.log(categoryValue);
  };

  const deleteButtonHandler = async (id: string) => {
    await BonamiService.deleteItem(id, setOpenSnackbar);
  };

  const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(colorful.lightRed),
    backgroundColor: colorful.lightRed,
    "&:hover": {
      backgroundColor: colorful.red,
    },
  }));

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
          <Button variant="contained" onClick={() => setCategoryValue("")}>
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
                <Card key={el._id} sx={{ padding: "unset" }}>
                  <img
                    src={el.images[0].url}
                    alt=""
                    style={{
                      width: "177px",
                      height: "177px",
                      borderRadius: "5px",
                    }}
                  />
                  <div style={{ padding: "10px" }}>
                    <Typography fontSize={"14px"} mb={"10px"}>
                      {el.name.ua.length >= 28
                        ? el.name.ua.slice(0, 24) + "..."
                        : el.name.ua}
                    </Typography>
                    <Grid container justifyContent={"space-between"}>
                      <Typography fontSize={"14px"} mb={"10px"}>
                        {el.price}
                      </Typography>
                      <Typography fontSize={"14px"} mb={"10px"}>
                        {el.discount}
                      </Typography>
                    </Grid>
                    <Grid container gap={"10px"}>
                      <Button
                        variant="contained"
                        sx={{
                          height: "25px",
                          width: "115px",
                          borderRadius: "10px",
                        }}
                        component={Link}
                        to={`/item/edit/${el._id}`}
                      >
                        <Typography fontSize={"14px"}>EDIT</Typography>
                        <EditOutlined sx={{ fontSize: 18 }} />
                      </Button>
                      <DeleteButton
                        variant="contained"
                        sx={{
                          width: "25px",
                          height: "25px",
                          minWidth: "unset",
                          backgroundColor: colorful.lightRed,
                        }}
                        onClick={() => {
                          deleteButtonHandler(el._id);
                        }}
                      >
                        <Delete fontSize={"small"} />
                      </DeleteButton>
                    </Grid>
                  </div>
                </Card>
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
      <MyAlert state={openSnackbar} setState={setOpenSnackbar}>
        <>{openSnackbar.message}</>
      </MyAlert>
    </Box>
  );
};

export default ItemList;
