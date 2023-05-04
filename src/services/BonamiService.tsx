import api from "../API/API";
import {
  ICategory,
  IGraph,
  IItem,
  IItemList,
  IOrder,
  IOrderList,
  IStatistic,
  IUser,
} from "../models/bonami-server-response";
import axios from "axios";
import {
  IAlertState,
  ICreateCategoryForm,
  ICreateItemForm,
  ICreateReviewForm,
} from "../models/bonami-client";
import { Dispatch, SetStateAction } from "react";
import { AlertColor } from "@mui/material";

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

  static async getItemList(
    search: string,
    category: string,
    page: number,
    per_page: number
  ) {
    return (
      await api.get<IItemList>(
        `/item/list?search=${search}&category=${category}&page=${page}&per_page=${per_page}`
      )
    ).data;
  }

  static async getItemById(id: string) {
    return (await api.get<IItem>(`/item?id=${id}`)).data;
  }

  static async getOrderList(
    email: string,
    date_start: number | "",
    date_end: number | "",
    sort: { element: string; direction: 1 | -1 },
    page: number,
    per_page: number
  ) {
    return (
      await api.get<IOrderList>(
        `/order/list?email=${email}&date_start=${date_start}&date_end=${date_end}&sort_element=${sort.element}&sort_direct=${sort.direction}&page=${page}&per_page=${per_page}`
      )
    ).data;
  }

  static async getOrderById(id: string) {
    return (await api.get<IOrder>(`/order?id=${id}`)).data;
  }

  static async getStatistics() {
    return (await api.get<IStatistic>(`/statistics`)).data;
  }

  static async getGraphData() {
    return (await api.get<IGraph[]>(`/statistics/graph`)).data;
  }

  static async recalculateProfit() {
    return (
      await api.get<{ delivered: number; pending: number }>(
        `/statistics/recalculate`
      )
    ).data;
  }

  static deleteReview(
    itemId: string,
    reviewId: string,
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
        severity: AlertColor;
      }>
    >
  ) {
    axios({
      method: "delete",
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/item/review/delete?item=${itemId}&review=${reviewId}`,
    })
      .then((res) => {
        console.log(res.data);
        setAlert({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static localLogin(
    email: string,
    password: string,
    setState: Dispatch<SetStateAction<boolean>>,
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
        severity: AlertColor;
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
      url: `${process.env.REACT_APP_SERVER_URL}/local`,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.isAdmin) {
            localStorage.setItem(`isAuth`, JSON.stringify(true));
            window.location.href = `${process.env.REACT_APP_CLIENT_URL}`;
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
          setAlert({
            isOpen: true,
            message: "Server error, try again later",
            severity: "error",
          });
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
        severity: AlertColor;
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
      url: `${process.env.REACT_APP_SERVER_URL}/item/create`,
    })
      .then((res) => {
        console.log(res);
        setAlert({ isOpen: true, message: "Success", severity: "success" });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static createCategory(
    data: ICreateCategoryForm,
    setAlert: Dispatch<SetStateAction<IAlertState>>
  ) {
    axios({
      method: "POST",
      data: { name: { en: data.nameEn, ua: data.nameUa } },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/category/create`,
    })
      .then((res) => {
        console.log(res);
        setAlert({
          isOpen: true,
          message: "Category created",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static createReview(
    data: ICreateReviewForm,
    setAlert: Dispatch<SetStateAction<IAlertState>>
  ) {
    axios({
      method: "POST",
      withCredentials: true,
      data: data,
      url: `${process.env.REACT_APP_SERVER_URL}/item/review/create`,
    })
      .then((res) => {
        console.log(res.data);
        setAlert({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static async deleteCategories(
    setAlert: Dispatch<SetStateAction<IAlertState>>,
    setDeletedCategories: Dispatch<SetStateAction<ICategory[]>>
  ) {
    axios({
      method: "DELETE",
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/category/delete-empty`,
    })
      .then((res) => {
        console.log(res.data);
        setDeletedCategories(res.data);
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static async deleteItem(
    id: string,
    setAlert: Dispatch<SetStateAction<IAlertState>>
  ) {
    await axios({
      method: "DELETE",
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/item/delete?id=${id}`,
    })
      .then((res) => {
        console.log(res.data);
        setAlert({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static async changeOrderStatus(
    id: string,
    status: "pending" | "canceled" | "delivered",
    setAlert: Dispatch<SetStateAction<IAlertState>>
  ) {
    await axios({
      method: "PUT",
      withCredentials: true,
      data: { status: status },
      url: `${process.env.REACT_APP_SERVER_URL}/order/status?id=${id}`,
    })
      .then((res) => {
        console.log(res.data);
        setAlert({
          isOpen: true,
          message: "Success",
          severity: "success",
        });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static updateItem(
    data: ICreateItemForm,
    menuItems: { value: string; name: string }[],
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
        severity: AlertColor;
      }>
    >,
    id: string
  ) {
    const categoryUa = menuItems?.find(
      (item) => item.value === data.categoryEn
    )?.name;
    axios({
      method: "PUT",
      data: { id, ...data, categoryUa },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/item/edit`,
    })
      .then((res) => {
        console.log(res);
        setAlert({ isOpen: true, message: "Success", severity: "success" });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static deleteImages(
    id: string,
    indexes: number[],
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
        severity: AlertColor;
      }>
    >
  ) {
    axios({
      method: "DELETE",
      data: { id: id, indexes: indexes },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/item/img/delete`,
    })
      .then((res) => {
        console.log(res);
        setAlert({ isOpen: true, message: "Success", severity: "success" });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }

  static editImages(
    id: string,
    indexes: number[],
    files: FileList,
    setAlert: Dispatch<
      SetStateAction<{
        isOpen: boolean;
        message: string;
        severity: AlertColor;
      }>
    >
  ) {
    const formData = new FormData();
    formData.append("id", id);
    for (const index of indexes) {
      formData.append("indexes", index.toString());
    }
    //@ts-ignore
    for (const file of files) {
      formData.append("files", file);
    }
    axios({
      method: "PUT",
      data: formData,
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/item/img/upload`,
    })
      .then((res) => {
        console.log(res);
        setAlert({ isOpen: true, message: "Success", severity: "success" });
      })
      .catch((e) => {
        console.log(e);
        setAlert({
          isOpen: true,
          message: "Server error, try again later",
          severity: "error",
        });
      });
  }
}
