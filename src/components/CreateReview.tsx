import React, { useState } from "react";
import {
  AlertColor,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateReviewForm } from "../models/bonami-client";
import BonamiService from "../services/BonamiService";
import MyAlert from "./UI/MyAlert";

const CreateReview = () => {
  const { register, handleSubmit } = useForm<ICreateReviewForm>();
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const onSubmit: SubmitHandler<ICreateReviewForm> = (data) => {
    BonamiService.createReview(data, setOpenSnackbar);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder={"Item id"}
          {...register("id")}
          required
          InputLabelProps={{ required: false }}
        />
        <Typography sx={{ marginTop: "15px" }}>Author</Typography>
        <Grid container gap={"10px"}>
          <TextField
            placeholder={"First name"}
            {...register("author.firstName")}
            required
            InputLabelProps={{ required: false }}
            sx={{ marginTop: "10px" }}
          />
          <TextField
            placeholder={"Second name"}
            {...register("author.secondName")}
            required
            InputLabelProps={{ required: false }}
            sx={{ marginTop: "10px" }}
          />
        </Grid>
        <TextField
          placeholder={"Patronymic"}
          {...register("author.patronymic")}
          required
          InputLabelProps={{ required: false }}
          sx={{ marginTop: "10px" }}
        />
        <FormControlLabel
          control={<Switch {...register("ordered")} />}
          label={"Is ordered"}
          sx={{ display: "block", mt: "10px" }}
        />
        <Typography sx={{ marginTop: "15px" }}>Review</Typography>
        <TextField
          placeholder={"Rating"}
          {...register("rating")}
          required
          inputProps={{
            pattern: "^[0-4](\\.\\d)?$|^5$",
          }}
          InputLabelProps={{ required: false }}
          sx={{ marginTop: "10px", display: "block" }}
        />
        <TextField
          placeholder={"Text"}
          {...register("text")}
          required
          InputLabelProps={{ required: false }}
          multiline
          rows={5}
          sx={{ marginTop: "10px", display: "block" }}
        />
        <Button
          type={"submit"}
          variant="contained"
          sx={{ marginTop: "15px", display: "block" }}
        >
          Create review
        </Button>
      </form>
      <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
    </>
  );
};

export default CreateReview;
