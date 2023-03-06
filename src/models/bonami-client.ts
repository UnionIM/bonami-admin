export interface ICreateItemForm {
  nameEn: string;
  nameUa: string;
  descriptionEn: string;
  descriptionUa: string;
  categoryEn: string;
  categoryUa: string;
  price: number;
  discount: number;
  files: Blob[];
}
