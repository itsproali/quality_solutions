import { IEvent } from "../Interfaces/Event.interface";
import authFetch from "./AxiosCommon";

type EventResponse = {
  results: IEvent[];
  total: number;
  totalPages: number;
};

export class EventServices {
  static async getEvents(): Promise<EventResponse> {
    try {
      const response = await authFetch.get("/api/v1/event");
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getFeaturedEvents(): Promise<EventResponse> {
    try {
      const response = await authFetch.get("/api/v1/event/featured");
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getSingleEvent(id: string): Promise<IEvent> {
    try {
      const response = await authFetch.get(`/api/v1/event/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
