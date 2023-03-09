import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
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

const Navbar = () => {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  const { register, handleSubmit } = useForm<ICreateCategoryForm>();

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    BonamiService.deleteCategories(setOpenSnackbar);
    setOpenDelete(false);
  };

  const logOutHandler = () => {
    BonamiController.logOut()
      .then((res: { message: string }) => {
        if (res.message === "success") {
          window.location.href = "http://localhost:3000/login";
        }
      })
      .catch((e) => console.log(e));
    localStorage.clear();
  };

  const onSubmit: SubmitHandler<ICreateCategoryForm> = (data) => {
    BonamiService.createCategory(data, setOpenSnackbar);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"} style={{ display: "inline-block", width: "200px" }}>
            <Typography
              sx={{ fontSize: "24px", lineHeight: "2.7" }}
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
                gap={"15px"}
                sx={{ ml: "40px" }}
                alignItems={"center"}
                component={"nav"}
              >
                <Link to={"/item/list"}>
                  <Typography>Item manager</Typography>
                </Link>
                <Link to={"/order/list"}>
                  <Typography>Orders</Typography>
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
                    Create item
                  </Link>
                  <span onClick={handleClickOpenCreate} key={2}>
                    Create category
                  </span>
                  <span onClick={handleClickOpenDelete} key={3}>
                    Delete categories
                  </span>
                </DropDownMenu>
                <Button onClick={logOutHandler} color={"inherit"}>
                  Logout
                </Button>
              </Grid>
            </Grid>
          ) : (
            <div></div>
          )}
          <ModalDialog
            state={openCreate}
            setState={setOpenCreate}
            title={"Create category"}
            width={"500px"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <MultiLangInputs
                register={register}
                header={"Name"}
                registerName={"name"}
              />
              <Button
                type={"submit"}
                variant="contained"
                sx={{ width: "100%", marginTop: "20px" }}
                onClick={handleCloseCreate}
              >
                CREATE
              </Button>
            </form>
          </ModalDialog>
          <ModalDialog
            state={openDelete}
            setState={setOpenDelete}
            title={"Delete category"}
            width={"500px"}
          >
            <div>
              <Typography>
                Click to button bellow to delete all categories without items
              </Typography>
              <Button
                variant="contained"
                sx={{ width: "100%", marginTop: "20px" }}
                onClick={handleCloseDelete}
              >
                DELETE
              </Button>
            </div>
          </ModalDialog>
          <MyAlert
            severity={"error"}
            state={openSnackbar}
            setState={setOpenSnackbar}
          >
            <>{openSnackbar.message}</>
          </MyAlert>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
