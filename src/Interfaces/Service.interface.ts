export interface IService {
  _id: string;
  title: string;
  category: string | any;
  type: string;
  price_usd: string;
  price_bdt: string;
  featured: false;
  isFree: false;
  shouldContact: false;
  image: string;
  thumbnail: string;
  description: string;
}
