import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { IAlertState } from "../../../models/bonami-client";

interface IDatePicker {
  dateEnd: Dayjs | null;
  setDateEnd: Dispatch<SetStateAction<Dayjs | null>>;
  dateStart: Dayjs | null;
  setDateStart: Dispatch<SetStateAction<Dayjs | null>>;
  setOpenSnackBar: Dispatch<SetStateAction<IAlertState>>;
}

const RangeDatePicker: FC<IDatePicker> = ({
  dateEnd,
  dateStart,
  setDateEnd,
  setDateStart,
  setOpenSnackBar,
}) => {
  const dateStartHandler = (newValue: Dayjs | null) => {
    if (newValue && dateEnd && dateEnd < newValue) {
      setOpenSnackBar({
        isOpen: true,
        message: "First date bigger than second",
        severity: "error",
      });
      setDateEnd(null);
    } else {
      setDateStart(newValue);
    }
  };

  const dateEndHandler = (newValue: Dayjs | null) => {
    if (newValue && dateStart && dateStart > newValue) {
      setOpenSnackBar({
        isOpen: true,
        message: "First date bigger than second",
        severity: "error",
      });
      setDateEnd(null);
    } else {
      //@ts-ignore
      const date = newValue?.$d;
      const date23_59_59 = new Date(date.valueOf() + 86400 * 1000 - 1000);
      setDateEnd(dayjs(date23_59_59));
    }
  };

  const clearDateHandler = () => {
    setDateStart(null);
    setDateEnd(null);
  };
  return (
    <Grid
      sx={{ width: "unset" }}
      container
      gap={"15px"}
      flexDirection={"column"}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "240px" }}
          label={"Date start"}
          value={dateStart}
          onChange={dateStartHandler}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{ width: "240px" }}
          label={"Date end"}
          value={dateEnd}
          onChange={dateEndHandler}
        />
      </LocalizationProvider>
      <Button
        sx={{ width: "240px" }}
        variant="contained"
        onClick={clearDateHandler}
      >
        CLEAR
      </Button>
    </Grid>
  );
};

export default RangeDatePicker;
