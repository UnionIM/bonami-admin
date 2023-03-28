import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Button,
  ButtonProps,
  Card,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Delete, EditOutlined } from "@mui/icons-material";
import { colorful } from "../../../design/colors";
import { IItemListElement } from "../../../models/bonami-server-response";
import BonamiService from "../../../services/BonamiService";
import { IAlertState } from "../../../models/bonami-client";

interface IItemCard {
  item: IItemListElement;
  setOpenSnackbar: Dispatch<SetStateAction<IAlertState>>;
}

const ItemCard: FC<IItemCard> = ({ item, setOpenSnackbar }) => {
  const deleteButtonHandler = async (id: string) => {
    await BonamiService.deleteItem(id, setOpenSnackbar);
  };

  const DeleteButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(colorful.lightRed),
    backgroundColor: colorful.lightRed,
    "&:hover": {
      backgroundColor: colorful.red,
    },
  }));

  return (
    <Card key={item._id} sx={{ padding: "unset" }}>
      <img
        src={item.images[0].url}
        alt=""
        style={{
          width: "177px",
          height: "177px",
          borderRadius: "5px",
        }}
      />
      <div style={{ padding: "10px" }}>
        <Typography fontSize={"14px"} mb={"10px"}>
          {item.name.ua.length >= 28
            ? item.name.ua.slice(0, 24) + "..."
            : item.name.ua}
        </Typography>
        <Grid container justifyContent={"space-between"}>
          <Typography fontSize={"14px"} mb={"10px"}>
            {item.price}
          </Typography>
          <Typography fontSize={"14px"} mb={"10px"}>
            {item.discount}%
          </Typography>
        </Grid>
        <Grid container gap={"10px"}>
          <Button
            variant="contained"
            sx={{
              height: "25px",
              width: "115px",
              borderRadius: "10px",
            }}
            component={Link}
            to={`/item/edit/${item._id}`}
          >
            <Typography fontSize={"14px"}>EDIT</Typography>
            <EditOutlined sx={{ fontSize: 18 }} />
          </Button>
          <DeleteButton
            variant="contained"
            sx={{
              width: "25px",
              height: "25px",
              minWidth: "unset",
              backgroundColor: colorful.lightRed,
            }}
            onClick={() => {
              deleteButtonHandler(item._id);
            }}
          >
            <Delete fontSize={"small"} />
          </DeleteButton>
        </Grid>
      </div>
    </Card>
  );
};

export default ItemCard;
