import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import BonamiController from "../controllers/BonamiController";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <div>
              <Link to={"/item/create"}>
                <Button sx={{ mr: 5 }} startIcon={<Add />} color={"inherit"}>
                  <Typography sx={{ fontSize: 14 }} component={"span"}>
                    Create item
                  </Typography>
                </Button>
              </Link>
              <Button onClick={logOutHandler} color={"inherit"}>
                Logout
              </Button>
            </div>
          ) : (
            <div></div>
          )}
        </Toolbar>
        {/*<Link to={"/"}>Home</Link>
      <Link to={"/login"}>Login</Link>
      <button onClick={logOutHandler}>LogOut</button>*/}
      </AppBar>
    </Box>
  );
};

export default Navbar;
