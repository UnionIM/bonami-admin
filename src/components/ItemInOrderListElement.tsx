import React, { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { IOrderedItem } from "../models/bonami-server-response";
import { gray } from "../design/colors";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface IItemInOrderListElement {
  item: IOrderedItem;
}

const ItemInOrderListElement: FC<IItemInOrderListElement> = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <Grid
      container
      alignItems={"center"}
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
        <img
          src={item.picture}
          alt="item img."
          style={{
            width: "87px",
            height: "87px",
            borderRadius: "5px",
          }}
        />
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
      <Typography>{item.price * item.amount} грн</Typography>
    </Grid>
  );
};

export default ItemInOrderListElement;
