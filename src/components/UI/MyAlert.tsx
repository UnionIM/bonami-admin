import React, { Dispatch, SetStateAction, FC, ReactElement } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface IMyAlert {
  state: { isOpen: boolean; message: string };
  setState: Dispatch<SetStateAction<{ isOpen: boolean; message: string }>>;
  severity: AlertColor;
  children: ReactElement;
}

const MyAlert: FC<IMyAlert> = ({ state, setState, severity, children }) => {
  const handleClose = () => {
    setState({ isOpen: false, message: state.message });
  };
  return (
    <Snackbar open={state.isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {children}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
