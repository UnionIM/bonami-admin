import React from "react";
import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { gray } from "../design/colors";

const ReviewsPage = () => {
  const { id } = useParams();

  const { data: item, message } = useFetchData(
    BonamiController.getItemById,
    [id],
    [id]
  );

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
              <Grid container gap={"40px"} sx={{ mt: "15px" }}>
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
            </>
          ) : (
            <CircularProgress sx={{ margin: "166px 320px" }} />
          )}
        </Card>
        {item ? (
          item.reviews.length ? (
            item.reviews.map((review) => (
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
                <Typography>{review.rating}</Typography>
                <Typography sx={{ maxWidth: "730px", wordWrap: "break-word" }}>
                  {review.text}
                </Typography>
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
          <Card sx={{ marginTop: "25px", width: "730px", height: "130px" }}>
            <CircularProgress />
          </Card>
        )}
      </Grid>
    </Box>
  );
};

export default ReviewsPage;
