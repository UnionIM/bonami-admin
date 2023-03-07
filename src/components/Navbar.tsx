import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box, Grid } from "@mui/material";
import BonamiController from "../controllers/BonamiController";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
import DropDownMenu from "./UI/DropDownMenu";
import ModalDialog from "./UI/ModalDialog";
import MultiLangInputs from "./UI/Inputs/MultiLangInputs";
import { useForm } from "react-hook-form";
import { ICreateCategoryForm } from "../models/bonami-client";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<ICreateCategoryForm>();

  const handleClickOpen = () => {
    setOpen(true);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"} style={{ flexGrow: 1 }}>
            <Typography component={"span"}>Bonami Admin</Typography>
          </Link>
          {localStorage.getItem("isAuth") ? (
            <Grid container sx={{ width: "unset" }} gap={"25px"}>
              <DropDownMenu buttonContent={<Add />}>
                <Link to={"/item/create"} key={1}>
                  Create item
                </Link>
                <span onClick={handleClickOpen} key={2}>
                  Create category
                </span>
              </DropDownMenu>
              <Button onClick={logOutHandler} color={"inherit"}>
                Logout
              </Button>
            </Grid>
          ) : (
            <div></div>
          )}
          <ModalDialog
            state={open}
            setState={setOpen}
            title={"Create category"}
            width={"500px"}
          >
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
              })}
            >
              <MultiLangInputs
                register={register}
                header={"Name"}
                registerName={"name"}
              />
              <Button
                type={"submit"}
                variant="contained"
                sx={{ width: "100%", marginTop: "20px" }}
              >
                CREATE
              </Button>
            </form>
          </ModalDialog>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
