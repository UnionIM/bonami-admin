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

export interface ICategory {
  _id: string;
  name: IMultiLang;
}
