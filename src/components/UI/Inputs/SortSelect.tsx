import React, { Dispatch, FC, SetStateAction } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ISort } from "../../../models/bonami-client";

interface ISortSelect {
  sort: ISort;
  setSort: Dispatch<SetStateAction<ISort>>;
  selectSortMenuItems: {
    value: ISort;
    name: string;
  }[];
}

const SortSelect: FC<ISortSelect> = ({
  sort,
  setSort,
  selectSortMenuItems,
}) => {
  const handleSortSelect = (e: SelectChangeEvent) => {
    setSort(JSON.parse(e.target.value));
  };

  return (
    <Select
      sx={{ width: "241px" }}
      value={JSON.stringify(sort)}
      onChange={handleSortSelect}
    >
      {selectSortMenuItems.map((el) => (
        <MenuItem
          key={JSON.stringify(el.value)}
          value={JSON.stringify(el.value)}
        >
          {el.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SortSelect;
