export interface ICourse {
  _id?: string;
  title: string;
  description: string;
  thumbnail: string;
  image: string;
  author: string;
  type: string;
  price_usd: number;
  price_bdt: number;
  isFeatured: boolean;
  total_chapters: number;
  total_duration: string;
  isFree: boolean;
}

export interface ChapterWithoutId {
  title: string;
  course: string;
}
export interface IChapter extends ChapterWithoutId {
  _id: string;
}
export interface VideoWithoutId {
  title: string;
  link: string;
  resource: string;
  isFree: boolean;
  course: string;
  chapter: string;
}
export interface IVideo extends VideoWithoutId {
  _id: string;
}
