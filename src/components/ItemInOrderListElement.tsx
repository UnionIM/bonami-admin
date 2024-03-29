import React, { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { IOrderedItem } from "../models/bonami-server-response";
import { gray } from "../design/colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import noImage from "../design/img/noImage.png";

interface IItemInOrderListElement {
  item: IOrderedItem;
}

const ItemInOrderListElement: FC<IItemInOrderListElement> = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <Grid
      container
      alignItems={"center"}
      gap={"10px"}
      sx={{ mb: "27px" }}
      justifyContent={"space-between"}
    >
      <Box position={"relative"} mr={"26px"}>
        <Box
          position={"absolute"}
          top={"-12px"}
          right={"-26px"}
          bgcolor={gray.dark}
          border={"2px solid white"}
          width={"52px"}
          textAlign={"center"}
          borderRadius={"11px"}
        >
          <Typography color={"white"} fontSize={"14px"}>
            {item.amount}
          </Typography>
        </Box>
        <object
          data={item.picture}
          style={{
            width: "87px",
            height: "87px",
            borderRadius: "5px",
          }}
        >
          <img
            src={noImage}
            alt="No img"
            style={{
              width: "87px",
              height: "87px",
              borderRadius: "5px",
            }}
          />
        </object>
      </Box>
      <Grid item>
        <Typography>
          {item.name.ua.length >= 32
            ? item.name.ua.slice(0, 32) + "..."
            : item.name.ua}
        </Typography>
        {width >= 740 ? (
          <Typography color={gray.dark}>ID: {item.id}</Typography>
        ) : (
          <></>
        )}
      </Grid>
      {width >= 740 ? (
        <Typography>
          {item.price} грн * {item.amount}
        </Typography>
      ) : (
        <></>
      )}
      <Typography sx={{ minWidth: "75px", textAlign: "right" }}>
        {item.price * item.amount} грн
      </Typography>
    </Grid>
  );
};

export default ItemInOrderListElement;
