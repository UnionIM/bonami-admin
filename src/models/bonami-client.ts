import { AlertColor } from "@mui/material";
import { ICustomerName } from "./bonami-server-response";

export interface ICreateItemForm {
  nameEn: string;
  nameUa: string;
  descriptionEn: string;
  descriptionUa: string;
  categoryEn: string;
  categoryUa: string;
  price: string;
  discount: string;
  files: Blob[];
}

export interface ICreateReviewForm {
  id: string;
  rating: number;
  author: ICustomerName;
  ordered: boolean | undefined;
  text: string;
}

export interface ICreateCategoryForm {
  nameEn: string;
  nameUa: string;
}

export interface IAlertState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}

export interface ISort {
  element: string;
  direction: 1 | -1;
}
