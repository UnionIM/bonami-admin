import React, { Dispatch, FC, SetStateAction } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ICreateItemForm } from "../../../models/bonami-client";

interface ISelect {
  label: any;
  control: Control<ICreateItemForm>;
  header: string;
  m?: string;
  menuItems: { value: string; name: string }[];
  defaultValue?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

const FormSelect: FC<ISelect> = ({
  label,
  control,
  menuItems,
  m = "0",
  header,
  defaultValue = "",
  state,
  setState,
}) => {
  const handleChange = (e: SelectChangeEvent<string>) => {
    setState(e.target.value);
  };
  return (
    <FormControl sx={{ m: `${m}` }}>
      <Typography mb={"10px"}>{header}</Typography>
      <Controller
        name={label}
        control={control}
        render={() => (
          <Select
            sx={{ width: "200px" }}
            defaultValue={defaultValue}
            required
            value={state}
            onChange={handleChange}
          >
            {menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        )}
      ></Controller>
    </FormControl>
  );
};

export default FormSelect;
