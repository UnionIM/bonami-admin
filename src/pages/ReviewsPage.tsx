import React, { useEffect, useState } from "react";
import {
  AlertColor,
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { gray } from "../design/colors";
import { IReview } from "../models/bonami-server-response";
import SortSelect from "../components/UI/Inputs/SortSelect";
import { ISort } from "../models/bonami-client";
import { sortArr } from "../utils/sort";
import MyAlert from "../components/UI/MyAlert";
import ReviewCard from "../components/UI/Cards/ReviewCard";

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
    if (message) {
      setOpenSnackbar({
        isOpen: true,
        message: "Server error, try again later",
        severity: "error",
      });
    }
    if (item && item._id) {
      setReviews(sortArr(item.reviews, sort.element, sort.direction));
    }
    if (item && !item._id) {
      setOpenSnackbar({
        isOpen: true,
        message: "Wrong id",
        severity: "error",
      });
    }
  }, [item, sort, message]);

  const selectSortMenuItems: { value: ISort; name: string }[] = [
    {
      value: { element: "rating", direction: -1 },
      name: "Спочатку найкраща оцінка",
    },
    {
      value: { element: "rating", direction: 1 },
      name: "Спочатку найгірша оцінка",
    },
    {
      value: { element: "createdAt", direction: -1 },
      name: "Спочатку новіші",
    },
    {
      value: { element: "createdAt", direction: 1 },
      name: "Спочатку останні",
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
          {item && item._id ? (
            <>
              <Typography>Інформація про товар</Typography>
              <Typography color={gray.dark}>ID: {id}</Typography>
              <Grid container gap={"40px"} sx={{ m: "15px 0 20px 0" }}>
                <Grid item>
                  <img
                    src={item.images[0].url}
                    alt="Фото товару"
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
              <ReviewCard
                review={review}
                id={id}
                setOpenSnackbar={setOpenSnackbar}
                key={review._id}
              />
            ))
          ) : (
            <Card sx={{ marginTop: "25px", width: "730px", height: "130px" }}>
              <Typography textAlign={"center"}>
                Жодних відгуків на цей товар
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
