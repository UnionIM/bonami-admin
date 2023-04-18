import React, { Dispatch, FC, SetStateAction } from "react";
import { Card, Grid, Rating, Typography } from "@mui/material";
import { colorful, gray } from "../../../design/colors";
import { timeConverter } from "../../../utils/timeConverter";
import { DeleteButton } from "../Buttons/DeleteButton";
import { Delete } from "@mui/icons-material";
import { IReview } from "../../../models/bonami-server-response";
import BonamiService from "../../../services/BonamiService";
import { IAlertState } from "../../../models/bonami-client";

interface IReviewCard {
  review: IReview;
  id: string | undefined;
  setOpenSnackbar: Dispatch<SetStateAction<IAlertState>>;
}

const ReviewCard: FC<IReviewCard> = ({ review, id, setOpenSnackbar }) => {
  const deleteReviewHandler = async (reviewId: string) => {
    if (id) {
      await BonamiService.deleteReview(id, reviewId, setOpenSnackbar);
    } else {
      setOpenSnackbar({
        isOpen: true,
        message: "Client error, try again later",
        severity: "error",
      });
    }
  };

  return (
    <Card sx={{ marginTop: "25px", width: "730px" }} key={review._id}>
      <Grid container justifyContent={"space-between"}>
        <Typography>
          {review.author.firstName} {review.author.secondName}{" "}
          {review.author.patronymic}
        </Typography>
        <Typography>
          {review.ordered ? "Item was ordered" : "Item was not ordered"}
        </Typography>
      </Grid>
      <Grid container gap={"15px"}>
        <Rating defaultValue={review.rating} precision={0.1} readOnly></Rating>
        <Typography sx={{ mt: "1px" }}>{review.rating}</Typography>
      </Grid>
      <Typography sx={{ maxWidth: "730px", wordWrap: "break-word" }}>
        {review.text}
      </Typography>
      <Grid container justifyContent={"space-between"}>
        <Typography color={gray.dark}>
          {timeConverter(review.createdAt)}
        </Typography>
        <DeleteButton
          variant="contained"
          sx={{
            width: "25px",
            height: "25px",
            minWidth: "unset",
            backgroundColor: colorful.lightRed,
          }}
          onClick={() => {
            deleteReviewHandler(review._id);
          }}
        >
          <Delete fontSize={"small"} />
        </DeleteButton>
      </Grid>
    </Card>
  );
};

export default ReviewCard;
