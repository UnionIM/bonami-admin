import { Button, ButtonProps, styled } from "@mui/material";
import { colorful } from "../../../design/colors";

export const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(colorful.lightRed),
  backgroundColor: colorful.lightRed,
  "&:hover": {
    backgroundColor: colorful.red,
  },
}));
