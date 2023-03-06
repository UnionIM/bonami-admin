import React, { FC } from "react";
import { MenuItem, Select, FormControl, Typography } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { ICreateItemForm } from "../../../models/bonami-client";

interface ISelect {
  register: any;
  label: any;
  control: Control<ICreateItemForm, any>;
  header: string;
  m?: string;
  menuItems: { value: string; name: string }[];
}

const FormSelect: FC<ISelect> = ({
  register,
  label,
  control,
  menuItems,
  m = "0",
  header,
}) => {
  return (
    <FormControl sx={{ m: `${m}` }}>
      <Typography mb={"10px"}>{header}</Typography>
      <Controller
        name={label}
        control={control}
        render={() => (
          <Select
            {...register(`${label}`)}
            sx={{ width: "200px" }}
            defaultValue={menuItems[0].value}
            required
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
