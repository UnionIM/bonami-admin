import React, { Dispatch, SetStateAction, FC, ReactElement } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface IMyAlert {
  state: { isOpen: boolean; message: string; severity: AlertColor };
  setState: Dispatch<
    SetStateAction<{ isOpen: boolean; message: string; severity: AlertColor }>
  >;
  children: ReactElement;
}

const MyAlert: FC<IMyAlert> = ({ state, setState, children }) => {
  const handleClose = () => {
    setState({
      isOpen: false,
      message: state.message,
      severity: state.severity,
    });
  };
  return (
    <Snackbar open={state.isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={state.severity}
        sx={{ width: "100%" }}
      >
        {children}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
