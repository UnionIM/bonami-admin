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

export interface IItem {
  _id: string;
  name: IMultiLang;
  description: IMultiLang;
  category: IMultiLang;
  images: IImage[];
  price: number;
  discount: number;
  reviews: IReview[];
}

interface IReview {
  _id: string;
  rating: number;
  author: ICustomerName;
  ordered: boolean;
  text: string;
  createdAt: number;
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

export interface IOrderedItem {
  _id: string;
  id: string;
  name: IMultiLang;
  picture: string;
  price: number;
  amount: number;
}

interface ICustomerName {
  firstName: string;
  secondName: string;
  patronymic: string;
}

export interface IDelivery {
  country: string;
  city: string;
  region: string;
  street: string;
  address: string;
  postIndex: string;
}

export interface IDeliveryToPostOffice {
  deliveryCompanyName: string;
  postOfficeNumber: string;
}

export interface IOrder {
  _id: string;
  socialMedia: ISocialMedia;
  email: string;
  phoneNumber: string;
  status: "pending" | "canceled" | "delivered";
  isPaid: boolean;
  isAuthenticated: boolean;
  notes: string;
  name: ICustomerName;
  items: IOrderedItem[];
  delivery: IDelivery;
  deliveryToPostOffice: IDeliveryToPostOffice;
  createdAt: number;
  amountOfOrders: number;
  message: string;
}

export interface IStatistic {
  orderStatistic: {
    mostPopularCategory: IMultiLang;
    _id: string;
    profitOfDeliveredOrders: number;
    profitOfPendingOrders: number;
    amountOfDeliveredOrders: number;
    amountOfPendingOrders: number;
    amountOfCanceledOrders: number;
  };
  orderedCategories: IOrderedCategory[];
  amountOfCategories: number;
}

export interface IOrderedCategory {
  categoryName: IMultiLang;
  orderedItems: number;
}

export interface IGraph {
  date: number;
  amount: number;
}
