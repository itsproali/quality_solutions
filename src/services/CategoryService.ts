import authFetch from "./AxiosCommon";

export class CategoryService {
  static async getAllCategories() {
    const response = await authFetch.get(`api/v1/category`, {
      params: {
        limit: 50,
      },
    });
    return response.data.result;
  }

  static async getActiveCategories() {
    const response = await authFetch.get(`api/v1/category`, {
      params: {
        status: "active",
        limit: 50,
      },
    });
    return response.data.result;
  }

  static async getCategoryById(id: string) {
    const response = await authFetch.get(`api/v1/category/${id}`);
    return response.data;
  }
}
