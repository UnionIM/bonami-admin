import { Dispatch, SetStateAction, useMemo } from "react";
import { AlertColor } from "@mui/material";

export default function useCategoryMenuItems(
  setOpenSnackbar: Dispatch<
    SetStateAction<{ isOpen: boolean; message: string; severity: AlertColor }>
  >,
  data: any[] | null,
  message: any
) {
  return useMemo<{ value: string; name: string }[] | undefined>(() => {
    //@ts-ignore
    if (message?.code === "ERR_NETWORK") {
      setOpenSnackbar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    } else {
      return data?.map((el) => {
        return {
          value: el.name.en,
          name: el.name.ua,
        };
      });
    }
  }, [data, message]);
}
