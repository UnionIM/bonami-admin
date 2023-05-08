import React, { FC, useState } from "react";
import { IOrderedItem } from "../models/bonami-server-response";
import ItemInOrderListElement from "./ItemInOrderListElement";
import { Grid, Button } from "@mui/material";

interface IItemInOrderList {
  items: IOrderedItem[];
}

const ItemInOrderList: FC<IItemInOrderList> = ({ items }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemNumber] = useState(4);

  const currentPageNumber = pageNumber * itemNumber - itemNumber;
  const paginatedItems = items.slice(
    currentPageNumber,
    currentPageNumber === 0 ? itemNumber : currentPageNumber * 2
  );

  const handlePrev = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
  };
  const handleNext = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ height: "80%" }}
    >
      <Grid item>
        {paginatedItems.map((item) => (
          <ItemInOrderListElement key={item._id} item={item} />
        ))}
      </Grid>
      <Grid item>
        <Button
          onClick={handlePrev}
          disabled={currentPageNumber === 0}
          sx={{ mr: "10px" }}
        >
          {"<"}
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            currentPageNumber * 2 >= items.length - 1 ||
            items.length === itemNumber
          }
        >
          {">"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ItemInOrderList;
