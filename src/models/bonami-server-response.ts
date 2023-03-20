interface ISocialMedia {
  telegram: string;
  instagram: string;
  facebook: string;
  viber: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  phone: string;
  socialMedia: ISocialMedia;
  firstName: string;
  secondName: string;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
}

interface IMultiLang {
  en: string;
  ua: string;
}

interface IImage {
  _id: string;
  url: string;
}

export interface ICategory {
  _id: string;
  name: IMultiLang;
}

export interface IItemListElement {
  _id: string;
  name: IMultiLang;
  category: IMultiLang;
  images: IImage[];
  price: number;
  discount: number;
}

export interface IItemList {
  itemList: IItemListElement[];
  totalCount: number;
}

export interface IOrderList {
  orderList: IOrderListElement[];
  totalCount: number;
}

export interface IOrderListElement {
  _id: string;
  socialMedia: ISocialMedia;
  email: string;
  phoneNumber: string;
  status: "pending" | "canceled" | "delivered";
  createdAt: number;
}
