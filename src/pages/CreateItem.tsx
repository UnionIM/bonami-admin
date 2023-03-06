import React, { ChangeEvent, useMemo, useState } from "react";
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
import axios from "axios";

const CreateItem = () => {
  const { register, handleSubmit, control } = useForm<ICreateItemForm>();

  const { data } = useFetchData(BonamiController.getCategories);

  const [dataFiles, setDataFiles] = useState<FileList>();
  const [files, setFiles] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState<string>("");

  const menuItems = useMemo(() => {
    return data?.map((el) => {
      return {
        value: el.name.en,
        name: el.name.ua,
      };
    });
  }, [data]);

  const onSubmit: SubmitHandler<ICreateItemForm> = (data) => {
    const formData = new FormData();
    const categoryUa = menuItems?.find(
      (item) => item.value === data.categoryEn
    )?.name;
    formData.append("nameEn", data.nameEn);
    formData.append("nameUa", data.nameUa);
    formData.append("descriptionEn", data.descriptionEn);
    formData.append("descriptionUa", data.descriptionUa);
    formData.append("categoryEn", data.categoryEn);
    formData.append("categoryUa", categoryUa || data.categoryEn);
    formData.append("price", data.price);
    formData.append("discount", data.discount || "0");
    //@ts-ignore
    console.log(...dataFiles, "DATA FILES");
    //@ts-ignore
    for (let file of dataFiles) {
      formData.append("files", file);
    }
    //@ts-ignore
    console.log(...formData);
    axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: "http://localhost:5000/item/create",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDataFiles(e.target.files);
      const fileArr = [];
      // @ts-ignore
      for (let fileItem of e.target.files) {
        fileArr.push(URL.createObjectURL(fileItem));
      }
      setFiles(fileArr);
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
                <CircularProgress />
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
              {files?.length ? (
                <ImageList
                  sx={{ width: 490, height: 235, m: "0 auto" }}
                  cols={3}
                  rowHeight={150}
                  gap={8}
                >
                  {files.map((el) => (
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
    </Box>
  );
};

export default CreateItem;
