import React, { useEffect, useState } from "react";
import {
  AlertColor,
  Box,
  Card,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { colorful, gray } from "../design/colors";
import { IReview } from "../models/bonami-server-response";
import SortSelect from "../components/UI/Inputs/SortSelect";
import { ISort } from "../models/bonami-client";
import { sortArr } from "../utils/sort";
import { timeConverter } from "../utils/timeConverter";
import MyAlert from "../components/UI/MyAlert";
import { Delete } from "@mui/icons-material";
import { DeleteButton } from "../components/UI/Buttons/DeleteButton";
import BonamiService from "../services/BonamiService";

const ReviewsPage = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState<IReview[]>();
  const [sort, setSort] = useState<{ element: string; direction: 1 | -1 }>({
    element: "createdAt",
    direction: -1,
  });
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const { data: item, message } = useFetchData(
    BonamiController.getItemById,
    [id],
    [id]
  );

  useEffect(() => {
    console.log(item);
    if (message) {
      setOpenSnackbar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
    if (item) {
      setReviews(sortArr(item.reviews, sort.element, sort.direction));
    }
  }, [item, sort, message]);

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

  const selectSortMenuItems: { value: ISort; name: string }[] = [
    {
      value: { element: "rating", direction: -1 },
      name: "Best rating first",
    },
    {
      value: { element: "rating", direction: 1 },
      name: "Worst rating first",
    },
    {
      value: { element: "createdAt", direction: -1 },
      name: "Newest first",
    },
    {
      value: { element: "createdAt", direction: 1 },
      name: "Oldest first",
    },
  ];

  return (
    <Box sx={{ p: "32px" }} display={"flex"}>
      <Grid
        container
        flexDirection={"column"}
        sx={{ margin: "0 auto", width: "unset" }}
      >
        <Card>
          {item ? (
            <>
              <Typography>Item information</Typography>
              <Typography color={gray.dark}>ID: {id}</Typography>
              <Grid container gap={"40px"} sx={{ m: "15px 0 20px 0" }}>
                <Grid item>
                  <img
                    src={item.images[0].url}
                    alt="Item img"
                    style={{
                      width: "300px",
                      height: "300px",
                      borderRadius: "5px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography sx={{ wordWrap: "break-word", width: "340px" }}>
                    {item.name.ua}
                  </Typography>
                  <Typography
                    overflow={"auto"}
                    sx={{
                      mt: "25px",
                      wordWrap: "break-word",
                      width: "340px",
                      height: "192px",
                    }}
                  >
                    {item.description.ua}
                  </Typography>
                </Grid>
              </Grid>
              <SortSelect
                sort={sort}
                setSort={setSort}
                selectSortMenuItems={selectSortMenuItems}
              />
            </>
          ) : (
            <CircularProgress sx={{ margin: "196px 320px" }} />
          )}
        </Card>
        {reviews ? (
          item?.reviews.length ? (
            reviews.map((review) => (
              <Card sx={{ marginTop: "25px", width: "730px" }} key={review._id}>
                <Grid container justifyContent={"space-between"}>
                  <Typography>
                    {review.author.firstName} {review.author.secondName}{" "}
                    {review.author.patronymic}
                  </Typography>
                  <Typography>
                    {review.ordered
                      ? "Item was ordered"
                      : "Item was not ordered"}
                  </Typography>
                </Grid>
                <Grid container gap={"15px"}>
                  <Rating
                    defaultValue={review.rating}
                    precision={0.1}
                    readOnly
                  ></Rating>
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
            ))
          ) : (
            <Card sx={{ marginTop: "25px", width: "730px", height: "130px" }}>
              <Typography textAlign={"center"}>
                No reviews on this item
              </Typography>
            </Card>
          )
        ) : (
          <Card sx={{ marginTop: "25px", width: "730px", height: "170px" }}>
            <CircularProgress sx={{ margin: "20px 320px" }} />
          </Card>
        )}
      </Grid>
      <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
    </Box>
  );
};

export default ReviewsPage;
