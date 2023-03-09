import React, { Dispatch, SetStateAction, FC, ReactElement } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface IMyAlert {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  severity: AlertColor;
  children: ReactElement;
}

const MyAlert: FC<IMyAlert> = ({ state, setState, severity, children }) => {
  const handleClose = () => {
    setState(false);
  };
  return (
    <Snackbar open={state} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
