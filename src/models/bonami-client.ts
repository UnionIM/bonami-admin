import { AlertColor } from "@mui/material";

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

export interface ICreateCategoryForm {
  nameEn: string;
  nameUa: string;
}

export interface IAlertState {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
}
