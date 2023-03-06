import React, { FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";

interface IMultiLangInputs {
  register: any;
  header: string;
  rows?: number;
  registerName: string;
}

const MultiLangInputs: FC<IMultiLangInputs> = ({
  register,
  header,
  rows = 1,
  registerName,
}) => {
  return (
    <Grid container flexDirection={"column"} gap={"10px"}>
      <Typography>{header}</Typography>
      <TextField
        label={"English"}
        {...register(`${registerName}En`)}
        required
        InputLabelProps={{ required: false }}
        multiline
        rows={rows}
      />
      <TextField
        label={"Ukrainian"}
        {...register(`${registerName}Ua`)}
        required
        InputLabelProps={{ required: false }}
        multiline
        rows={rows}
      />
    </Grid>
  );
};

export default MultiLangInputs;
