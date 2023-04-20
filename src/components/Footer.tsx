import React from "react";
import { BottomNavigation } from "@mui/material";
import { colorful } from "../design/colors";

const Footer = () => {
  return (
    <BottomNavigation
      sx={{ height: "180px", bgcolor: colorful.blue, marginTop: "auto" }}
    />
  );
};

export default Footer;
