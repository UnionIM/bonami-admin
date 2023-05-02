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
import { DeleteButton } from "../components/UI/Buttons/DeleteButton";
import { Delete, EditOutlined } from "@mui/icons-material";

const CreateItem = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { data: itemToEdit } = useFetchData(
    BonamiController.getItemById,
    [id],
    [id]
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
              categoryEn: itemToEdit.category ? itemToEdit.category.en : "",
              categoryUa: itemToEdit.category ? itemToEdit.category.ua : "",
              price: itemToEdit.price ? itemToEdit.price.toString() : "",
              discount: itemToEdit.discount
                ? itemToEdit.discount.toString()
                : "",
            },
          }
        : {}
    );

  useEffect(() => {
    if (itemToEdit) {
      setCategoryEn(itemToEdit.category.en);
    }
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
    if (location.pathname === "/item/create") {
      setImgDisplayLinks([]);
      setCategoryEn("");
    }
  }, [itemToEdit, location.pathname]);

  const { data, message } = useFetchData(BonamiController.getCategories);

  const [files, setFiles] = useState<FileList>();
  const [imgDisplayLinks, setImgDisplayLinks] = useState<string[]>([]);
  const [captcha, setCaptcha] = useState<string>("");
  const [deleteImgIndexes, setDeleteImgIndexes] = useState<number[]>([]);
  const [editImgIndexes, setEditImgIndexes] = useState<number[]>([]);
  const [editFiles, setEditFiles] = useState<FileList | null>(null);
  const [categoryEn, setCategoryEn] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({ isOpen: false, message: "", severity: "info" });

  const menuItems = useCategoryMenuItems(setOpenSnackbar, data, message);

  const onSubmit: SubmitHandler<ICreateItemForm> = (data) => {
    if (location.pathname === "/item/create") {
      if (files?.length && menuItems) {
        data.categoryEn = categoryEn;
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
    } else {
      if (menuItems && id) {
        BonamiService.updateItem(data, menuItems, setOpenSnackbar, id);
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (files) {
        // @ts-ignore
        setFiles((prevState) => [
          // @ts-ignore
          ...Array.from(prevState),
          // @ts-ignore
          ...Array.from(e.target.files),
        ]);
      } else {
        // @ts-ignore
        setFiles(e.target.files);
      }
      const fileArr: string[] = [];
      // @ts-ignore
      for (let fileItem of e.target.files) {
        fileArr.push(URL.createObjectURL(fileItem));
      }
      setImgDisplayLinks((prevState) => [...prevState, ...fileArr]);
    }
  };

  const captchaHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCaptcha(e.target.value);
  };

  const deleteImgHandler = (url: string) => {
    const indexOfDeleted = imgDisplayLinks.indexOf(url);
    setDeleteImgIndexes((prevState) => [...prevState, indexOfDeleted]);
    if (files) {
      const dt = new DataTransfer();
      for (let i = 0; i < files?.length; i++) {
        const file = files[i];
        if (indexOfDeleted !== i + (imgDisplayLinks.length - files.length)) {
          dt.items.add(file);
        }
      }
      setFiles(dt.files);
    }
    const linksWithoutDeleted = imgDisplayLinks.filter((el) => el !== url);
    setImgDisplayLinks(linksWithoutDeleted);
  };

  const handleImgEdit = (e: ChangeEvent<HTMLInputElement>, url: string) => {
    if (e.target.files) {
      const indexOfEdited = imgDisplayLinks.indexOf(url);
      const editedImgDisplayLinks = imgDisplayLinks.map((url, index) => {
        if (index === indexOfEdited) {
          return URL.createObjectURL(
            // @ts-ignore
            e.target.files[0]
          );
        }
        return url;
      });
      setImgDisplayLinks(editedImgDisplayLinks);
      setEditImgIndexes((prevState) => [...prevState, indexOfEdited]);
      if (editFiles?.length) {
        //@ts-ignore
        setEditFiles((prevState) => [
          //@ts-ignore
          ...Array.from(prevState),
          //@ts-ignore
          e.target.files[0],
        ]);
      } else {
        setEditFiles(e.target.files);
      }
    }
  };

  const saveChanges = () => {
    if (id && deleteImgIndexes.length) {
      console.log("b");
      BonamiService.deleteImages(id, deleteImgIndexes, setOpenSnackbar);
      setDeleteImgIndexes([]);
    }
    if (id && editFiles?.length && editImgIndexes.length) {
      console.log("a");
      BonamiService.editImages(id, editImgIndexes, editFiles, setOpenSnackbar);
    }
    if (id && files) {
      const loadImgIndexes: number[] = [];
      for (let i = 0; i < imgDisplayLinks.length; i++) {
        if (!imgDisplayLinks[i].includes("bonami-image-bucket")) {
          loadImgIndexes.push(i);
        }
      }
      BonamiService.editImages(id, loadImgIndexes, files, setOpenSnackbar);
    }
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
              {id ? (
                itemToEdit && menuItems ? (
                  <FormSelect
                    label={"categoryEn"}
                    header={"Category"}
                    control={control}
                    state={categoryEn}
                    setState={setCategoryEn}
                    menuItems={menuItems}
                    defaultValue={itemToEdit.category.en}
                    m={"20px 0"}
                  />
                ) : (
                  <CircularProgress sx={{ margin: "20px 0" }} />
                )
              ) : menuItems ? (
                <FormSelect
                  label={"categoryEn"}
                  header={"Category"}
                  state={categoryEn}
                  setState={setCategoryEn}
                  control={control}
                  menuItems={menuItems}
                  m={"20px 0"}
                />
              ) : (
                <CircularProgress sx={{ margin: "20px 0" }} />
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
            <Card sx={{ height: "508px", position: "relative" }}>
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
                  rowHeight={193}
                  gap={8}
                >
                  {imgDisplayLinks.map((imgUrl) => (
                    <ImageListItem key={imgUrl}>
                      <Box>
                        <img
                          src={`${imgUrl}`}
                          style={{
                            width: "156px",
                            height: "156px",
                            borderRadius: "5px",
                          }}
                          alt={"Image"}
                          loading={"lazy"}
                        />
                        <Grid container justifyContent={"space-between"}>
                          <Button variant={"contained"} component="label">
                            <EditOutlined sx={{ fontSize: 18 }} />
                            <input
                              onChange={(e) => handleImgEdit(e, imgUrl)}
                              accept="image/*"
                              type="file"
                              hidden
                            />
                          </Button>
                          <DeleteButton
                            onClick={() => {
                              deleteImgHandler(imgUrl);
                            }}
                            variant={"contained"}
                          >
                            <Delete fontSize={"small"} />
                          </DeleteButton>
                        </Grid>
                      </Box>
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
              {location.pathname !== "/item/create" ? (
                <Button
                  sx={{ position: "absolute", bottom: "20px", right: "20px" }}
                  onClick={saveChanges}
                  disabled={
                    !(
                      editImgIndexes.length ||
                      deleteImgIndexes.length ||
                      files?.length
                    )
                  }
                  variant={"contained"}
                >
                  SAVE
                </Button>
              ) : (
                <></>
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
