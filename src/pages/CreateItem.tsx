import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import MultiLangInputs from "../components/UI/Inputs/MultiLangInputs";
import FormSelect from "../components/UI/Inputs/FormSelect";
import useFetchData from "../hooks/useFetchData";
import BonamiController from "../controllers/BonamiController";
import { ICreateItemForm } from "../models/bonami-client";
import BonamiService from "../services/BonamiService";
import MyAlert from "../components/UI/MyAlert";
import useCategoryMenuItems from "../hooks/useCategoryMenuItems";

const CreateItem = () => {
  const { register, handleSubmit, control } = useForm<ICreateItemForm>();

  const { data, message } = useFetchData(BonamiController.getCategories);

  const [files, setFiles] = useState<FileList>();
  const [imgDisplayLinks, setImgDisplayLinks] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
  }>({ isOpen: false, message: "" });

  const menuItems = useCategoryMenuItems(setOpenSnackbar, data, message);

  const onSubmit: SubmitHandler<ICreateItemForm> = (data) => {
    if (files && menuItems) {
      BonamiService.createItem(data, menuItems, files, setOpenSnackbar);
    } else {
      setOpenSnackbar({ isOpen: true, message: "Add at least 1 photo" });
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
      const fileArr = [];
      // @ts-ignore
      for (let fileItem of e.target.files) {
        fileArr.push(URL.createObjectURL(fileItem));
      }
      setImgDisplayLinks(fileArr);
    }
  };

  const captchaHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptcha(e.target.value);
  };

  return (
    <Box p={"32px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={"25px"} m={"0 auto"} sx={{ flexWrap: "unset" }}>
          <Grid item>
            <Card sx={{ width: "450px" }}>
              <MultiLangInputs
                register={register}
                header={"Name"}
                registerName={"name"}
              />
              {!menuItems ? (
                <CircularProgress sx={{ margin: "20px 0" }} />
              ) : (
                <FormSelect
                  register={register}
                  label={"categoryEn"}
                  header={"Category"}
                  control={control}
                  menuItems={menuItems}
                  m={"20px 0"}
                />
              )}
              <MultiLangInputs
                register={register}
                header={"Description"}
                rows={5}
                registerName={"description"}
              />
            </Card>
          </Grid>
          <Grid item container gap={"25px"} flexDirection={"column"}>
            <Card>
              <Typography fontSize={"20px"}>Photos</Typography>
              <Typography fontSize={"15px"}>
                First photo will be main photo of item and will be displayed in
                catalog grid
              </Typography>
              <Button
                variant="contained"
                component="label"
                sx={{ margin: "10px 0" }}
              >
                Upload
                <input
                  {...register("files")}
                  onChange={handleFileInput}
                  accept="image/*"
                  type="file"
                  multiple
                  hidden
                />
              </Button>
              {imgDisplayLinks?.length ? (
                <ImageList
                  sx={{ width: 490, height: 235, m: "0 auto" }}
                  cols={3}
                  rowHeight={150}
                  gap={8}
                >
                  {imgDisplayLinks.map((el) => (
                    <ImageListItem key={el}>
                      <img
                        src={`${el}`}
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: "5px",
                        }}
                        alt={"Image"}
                        loading={"lazy"}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Typography
                  sx={{
                    height: "235px",
                    textAlign: "center",
                    paddingTop: "90px",
                  }}
                >
                  Upload photo
                </Typography>
              )}
            </Card>
            <Card>
              <Grid container gap={"20px"}>
                <Grid item>
                  <Typography>Price</Typography>
                  <TextField
                    {...register("price")}
                    inputProps={{
                      pattern: "^[1-9][0-9]*(?:[.](?!00)[0-9]{1,1})?[^.]$",
                    }}
                    required
                    InputLabelProps={{ required: true }}
                  />
                </Grid>
                <Grid item>
                  <Typography>Discount</Typography>
                  <TextField
                    {...register("discount")}
                    inputProps={{
                      pattern: "^[0-9]*(?:[.](?!00)[0-9]{1,1})?[^.]$",
                    }}
                    required
                    InputLabelProps={{ required: false }}
                  />
                </Grid>
              </Grid>
            </Card>
            <Card>
              <Grid container justifyContent={"space-between"}>
                <TextField
                  placeholder={"Please enter ‘I want to create item’"}
                  onChange={captchaHandler}
                  value={captcha}
                  sx={{ width: "70%" }}
                />
                <Button
                  type={"submit"}
                  variant="contained"
                  disabled={!(captcha === "I want to create item")}
                  sx={{ width: "25%" }}
                >
                  CREATE
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
      <MyAlert
        severity={"error"}
        state={openSnackbar}
        setState={setOpenSnackbar}
      >
        <>{openSnackbar.message}</>
      </MyAlert>
    </Box>
  );
};

export default CreateItem;
