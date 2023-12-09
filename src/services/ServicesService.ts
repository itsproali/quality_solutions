import { IService } from "../Interfaces/Service.interface";
import { IAllGetResponse } from "../Interfaces/common.interface";
import authFetch from "./AxiosCommon";

export class ServicesService {
  static async getServices(category?: string) {
    try {
      const response = await authFetch.get<IAllGetResponse<IService>>(
        "/api/v1/service",
        {
          params: {
            category,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }
  static async getRecommendedServices(page: number, id: string) {
    try {
      const response = await authFetch.get<IAllGetResponse<IService>>(
        "/api/v1/service/recommended/" + id,
        {
          params: {
            page,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }
}
