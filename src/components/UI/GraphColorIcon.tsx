import React, { FC } from "react";
import { Box } from "@mui/material";

interface IGraphColorIcon {
  color: string;
}

const GraphColorIcon: FC<IGraphColorIcon> = ({ color }) => {
  return (
    <Box
      sx={{
        width: "25px",
        height: "12px",
        borderRadius: "4px",
        bgcolor: color,
      }}
    />
  );
};

export default GraphColorIcon;
