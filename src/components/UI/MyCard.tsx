import React, { FC } from "react";
import { Box } from "@mui/material";
import { gray } from "../../design/colors";

interface IMyCard {
  children: React.ReactNode;
}

const MyCard: FC<IMyCard> = ({ children }) => {
  return (
    <Box
      p={"25px"}
      borderRadius={"8px"}
      bgcolor={"white"}
      boxShadow={`0px 0px 5px ${gray.dark}`}
      display={"inline-block"}
    >
      {children}
    </Box>
  );
};

export default MyCard;
