export interface IBook {
  _id: string;
  title: string;
  description?: string;
  discount: number;
  price_bdt: number;
  price_usd: number;
  isFree: boolean | string;
  featured: boolean | string;
  thumbnail: string;
  image: string;
  type: string;
  author: string | any;
  category: string | any;
}
