import api from "../API/API";
import {
  ICategory,
  IItemListElement,
  IUser,
} from "../models/bonami-server-response";
import axios from "axios";
import { ICreateCategoryForm, ICreateItemForm } from "../models/bonami-client";
import { Dispatch, SetStateAction } from "react";

export default class BonamiService {
  static async isAuth() {
    return (await api.get("/isAuth")).data;
  }

  static async logOut() {
    return (await api.get("/logout")).data;
  }

  static async getUser() {
    return (await api.get<IUser>("/user")).data;
  }

  static async getCategories() {
    return (await api.get<ICategory[]>("/category")).data;
  }

  static async getItemList() {
    return (await api.get<IItemListElement[]>("/item/list")).data;
  }

  static localLogin(
    email: string,
    password: string,
    setState: Dispatch<SetStateAction<boolean>>,
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
      }>
    >
  ) {
    axios({
      method: "POST",
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:5000/local",
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.isAdmin) {
            localStorage.setItem(`isAuth`, JSON.stringify(true));
            window.location.href = "http://localhost:3000";
          } else {
            setState(true);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        if (e.code !== "ERR_NETWORK" && !e.response.data.success) {
          setState(true);
        } else {
          setAlert({ isOpen: true, message: "Server error, try again later" });
        }
        console.log(e);
      });
  }

  static createItem(
    data: ICreateItemForm,
    menuItems: { value: string; name: string }[],
    files: FileList,
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
      }>
    >
  ) {
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
    for (let file of files) {
      formData.append("files", file);
    }
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
        setAlert({ isOpen: true, message: "Server error, try again later" });
      });
  }

  static createCategory(
    data: ICreateCategoryForm,
    setAlert: Dispatch<SetStateAction<{ isOpen: boolean; message: string }>>
  ) {
    axios({
      method: "POST",
      data: { name: { en: data.nameEn, ua: data.nameUa } },
      withCredentials: true,
      url: "http://localhost:5000/category/create",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        setAlert({ isOpen: true, message: "Server error, try again later" });
      });
  }

  static deleteCategories(
    setAlert: Dispatch<SetStateAction<{ isOpen: boolean; message: string }>>
  ) {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: "http://localhost:5000/category/delete-empty",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        setAlert({ isOpen: true, message: "Server error, try again later" });
      });
  }
}
