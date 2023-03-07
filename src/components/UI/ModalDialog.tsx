import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import React, { Dispatch, FC, ReactElement, SetStateAction } from "react";
import { Close } from "@mui/icons-material";

interface IModalDialog {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactElement;
  width?: string;
}

const ModalDialog: FC<IModalDialog> = ({
  state,
  setState,
  title,
  children,
  width = "unset",
}) => {
  const handleClose = () => {
    setState(false);
  };

  return (
    <div>
      <Dialog open={state} onClose={handleClose}>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"16px 24px 0"}
        >
          <DialogTitle sx={{ padding: "unset" }}>{title}</DialogTitle>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        <DialogContent sx={{ width: width }}>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default ModalDialog;
