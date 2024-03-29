import { Dispatch, SetStateAction, useMemo } from "react";
import { IAlertState } from "../models/bonami-client";

export default function useCategoryMenuItems(
  setOpenSnackbar: Dispatch<SetStateAction<IAlertState>>,
  data: any[] | null,
  message: any
) {
  return useMemo<{ value: string; name: string }[] | undefined>(() => {
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
