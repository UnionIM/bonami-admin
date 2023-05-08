import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  AlertColor,
} from "@mui/material";
import BonamiController from "../controllers/BonamiController";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DropDownMenu from "./UI/DropDownMenu";
import ModalDialog from "./UI/ModalDialog";
import MultiLangInputs from "./UI/Inputs/MultiLangInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateCategoryForm } from "../models/bonami-client";
import BonamiService from "../services/BonamiService";
import MyAlert from "./UI/MyAlert";
import { ICategory } from "../models/bonami-server-response";
import useWindowDimensions from "../hooks/useWindowDimensions";
import CreateReview from "./CreateReview";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openCreateReview, setOpenCreateReview] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openDeletedCategories, setOpenDeletedCategories] =
    useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });
  const [deletedCategories, setDeletedCategories] = useState<ICategory[]>([]);

  const { register, handleSubmit } = useForm<ICreateCategoryForm>();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenCreateReview = () => {
    setOpenCreateReview(true);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    BonamiService.deleteCategories(setOpenSnackbar, setDeletedCategories);
    setOpenDelete(false);
    setOpenDeletedCategories(true);
  };

  const logOutHandler = () => {
    BonamiController.logOut()
      .then((res: { message: string }) => {
        if (res.message === "success") {
          window.location.href = `${process.env.REACT_APP_CLIENT_URL}/login`;
        }
      })
      .catch((e) => console.log(e));
    localStorage.clear();
  };

  const onSubmit: SubmitHandler<ICreateCategoryForm> = (data) => {
    BonamiService.createCategory(data, setOpenSnackbar);
  };

  return (
    <Box sx={{ maxHeight: "65px" }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"} style={{ display: "inline-block", width: "200px" }}>
            <Typography
              sx={{
                fontSize: width >= 779 ? "24px" : "19px",
                lineHeight: "2.7",
              }}
              component={"span"}
            >
              Bonami Admin
            </Typography>
          </Link>
          {localStorage.getItem("isAuth") ? (
            <Grid
              container
              justifyContent={"space-between"}
              sx={{ flexWrap: "unset" }}
            >
              <Grid
                item
                container
                gap={"35px"}
                sx={{ ml: "40px" }}
                alignItems={"center"}
                component={"nav"}
              >
                <Link to={"/item/list/1"}>
                  <Typography>Товари</Typography>
                </Link>
                <Link to={"/order/list/1"}>
                  <Typography>Замовлення</Typography>
                </Link>
              </Grid>
              <Grid
                item
                container
                sx={{ width: "unset", flexWrap: "unset" }}
                gap={"25px"}
              >
                <DropDownMenu buttonContent={<Add />}>
                  <Link to={"/item/create"} key={1}>
                    Створити товар
                  </Link>
                  <span onClick={handleClickOpenCreateReview} key={2}>
                    Створити відгук
                  </span>
                  <span onClick={handleClickOpenCreate} key={3}>
                    Створити категорію
                  </span>
                  <span onClick={handleClickOpenDelete} key={4}>
                    Видалити категорію
                  </span>
                </DropDownMenu>
                <Button onClick={logOutHandler} color={"inherit"}>
                  Вийти
                </Button>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
          <ModalDialog
            state={openCreateReview}
            setState={setOpenCreateReview}
            title={"Створити відгук"}
            width={"600px"}
          >
            <CreateReview />
          </ModalDialog>
          <ModalDialog
            state={openCreate}
            setState={setOpenCreate}
            title={"Створити категорію"}
            width={"500px"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <MultiLangInputs
                register={register}
                header={"Назва"}
                registerName={"name"}
              />
              <Button
                type={"submit"}
                variant="contained"
                sx={{ width: "100%", marginTop: "20px" }}
                onClick={handleCloseCreate}
              >
                СТВОРИТИ
              </Button>
            </form>
          </ModalDialog>
          <ModalDialog
            state={openDelete}
            setState={setOpenDelete}
            title={"Видалити категорію"}
            width={"500px"}
          >
            <div>
              <Typography>
                Натисніть кнопку знизу щоб видалити категорії без товарів
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "20px" }}
                onClick={handleCloseDelete}
              >
                ВИДАЛИТИ
              </Button>
            </div>
          </ModalDialog>
          <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
          <ModalDialog
            state={openDeletedCategories}
            setState={setOpenDeletedCategories}
            title={"Deleted categories"}
            width={"500px"}
          >
            <div>
              {deletedCategories.map((el) => (
                <Typography key={el._id}>{el.name.en}</Typography>
              ))}
            </div>
          </ModalDialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
