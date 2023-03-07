interface IMultiLang {
  en: string;
  ua: string;
}

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
  name: IMultiLang;
}
