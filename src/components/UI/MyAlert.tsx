import React, { Dispatch, SetStateAction, FC } from "react";
import { Alert, Snackbar } from "@mui/material";
import { IAlertState } from "../../models/bonami-client";

interface IMyAlert {
  state: IAlertState;
  setState: Dispatch<SetStateAction<IAlertState>>;
}

const MyAlert: FC<IMyAlert> = ({ state, setState /*, children*/ }) => {
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
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default MyAlert;
