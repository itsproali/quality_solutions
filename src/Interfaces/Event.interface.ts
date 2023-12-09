export interface IEvent {
  _id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  isFeatured: boolean;
  registrationLink: string;
  type: "workshop" | "seminar" | "conference" | "other";
  createdAt: string;
  updatedAt: string;
  __v: number;
}
