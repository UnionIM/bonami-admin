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
