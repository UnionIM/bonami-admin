import React, { FC, ReactElement } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

interface IDropDownMenu {
  buttonContent: React.ReactNode | string;
  children: ReactElement[];
}

const DropDownMenu: FC<IDropDownMenu> = ({ buttonContent, children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color={"inherit"}
        sx={{ minWidth: "unset" }}
      >
        {buttonContent}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {children.map((item) => (
          <MenuItem key={item.key} onClick={handleClose}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
