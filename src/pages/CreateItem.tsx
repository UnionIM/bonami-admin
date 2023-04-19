import React, { ChangeEvent, useEffect, useState } from "react";
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
  AlertColor,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreateItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: itemToEdit, message: itemByIdMessage } = useFetchData(
    BonamiController.getItemById,
    [id],
    []
  );

  const { register, handleSubmit, reset, control, setValue } =
    useForm<ICreateItemForm>(
      itemToEdit
        ? {
            defaultValues: {
              nameEn: itemToEdit.name ? itemToEdit.name.en : "",
              nameUa: itemToEdit.name ? itemToEdit.name.ua : "",
              descriptionEn: itemToEdit.description
                ? itemToEdit.description.en
                : "",
              descriptionUa: itemToEdit.description
                ? itemToEdit.description.ua
                : "",
              categoryEn: itemToEdit.category ? itemToEdit.description.en : "",
              categoryUa: itemToEdit.category ? itemToEdit.description.ua : "",
              price: itemToEdit.price ? itemToEdit.price.toString() : "",
              discount: itemToEdit.discount
                ? itemToEdit.discount.toString()
                : "",
            },
          }
        : {}
    );

  useEffect(() => {
    if (location.pathname === "/item/create" && itemToEdit) {
      reset();
    }
    if (itemToEdit !== null && !itemToEdit.name) {
      navigate("/item/create");
    }
    if (location.pathname !== "/item/create" && itemToEdit?._id) {
      const urlArr = itemToEdit?.images.map((el) => el.url);
      setImgDisplayLinks(urlArr);
      setValue("nameEn", itemToEdit?.name.en);
      setValue("nameUa", itemToEdit?.name.ua);
      setValue("descriptionEn", itemToEdit?.description.en);
      setValue("descriptionUa", itemToEdit?.description.ua);
      setValue("categoryEn", itemToEdit?.category.en);
      setValue("categoryUa", itemToEdit?.category.ua);
      setValue("price", itemToEdit?.price.toString());
      setValue("discount", itemToEdit?.discount.toString());
    }
  }, [itemToEdit, location]);

  const { data, message } = useFetchData(BonamiController.getCategories);

  const [files, setFiles] = useState<FileList>();
  const [imgDisplayLinks, setImgDisplayLinks] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const menuItems = useCategoryMenuItems(setOpenSnackbar, data, message);

  const onSubmit: SubmitHandler<ICreateItemForm> = (data) => {
    if (files?.length && menuItems) {
      BonamiService.createItem(data, menuItems, files, setOpenSnackbar);
    } else if (!files?.length) {
      setOpenSnackbar({
        isOpen: true,
        message: "Add at least 1 photo",
        severity: "error",
      });
    } else {
      setOpenSnackbar({
        isOpen: true,
        message: "Server error try again later",
        severity: "error",
      });
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
                  placeholder={`Please enter ‘I want to ${
                    location.pathname === "/item/create" ? "create" : "edit"
                  } item’`}
                  onChange={captchaHandler}
                  value={captcha}
                  sx={{ width: "70%" }}
                />
                <Button
                  type={"submit"}
                  variant="contained"
                  disabled={
                    !(
                      captcha ===
                      `I want to ${
                        location.pathname === "/item/create" ? "create" : "edit"
                      } item`
                    )
                  }
                  sx={{ width: "25%" }}
                >
                  {location.pathname === "/item/create" ? "CREATE" : "EDIT"}
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </form>
      <MyAlert state={openSnackbar} setState={setOpenSnackbar} />
    </Box>
  );
};

export default CreateItem;
