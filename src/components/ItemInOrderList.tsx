import React, { FC, useState } from "react";
import { IOrderedItem } from "../models/bonami-server-response";
import ItemInOrderListElement from "./ItemInOrderListElement";
import { Button } from "@mui/material";

interface IItemInOrderList {
  items: IOrderedItem[];
}

const ItemInOrderList: FC<IItemInOrderList> = ({ items }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [itemNumber] = useState(3);

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
    <div style={{ position: "relative", height: "410px" }}>
      {paginatedItems.map((item) => (
        <ItemInOrderListElement key={item._id} item={item} />
      ))}
      <div style={{ position: "absolute", bottom: 0, left: "41%" }}>
        <Button
          onClick={handlePrev}
          disabled={currentPageNumber === 0}
          sx={{ mr: "10px" }}
        >
          Prev
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentPageNumber * 2 >= items.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ItemInOrderList;
