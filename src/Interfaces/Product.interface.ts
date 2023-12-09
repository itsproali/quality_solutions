export interface IProducts {
  totalPages: number;
  total: number;
  results: IProduct[];
}

export interface IProduct {
  _id: string;
  type: string;
  title: string;
  description: string;
  category: string;
  price_usd: number;
  price_bdt: number;
  image: string;
  thumbnail: string;
  featured: boolean;
  isFree: boolean;
  shouldContact: boolean;
  document: string;
  __v: number;
}
