import authFetch from "./AxiosCommon";

export class OrderService {
  static async getOrder(token: string, { status }: { status?: string } = {}) {
    try {
      const response = await authFetch.get(`/api/v1/order`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: {
          status: status || undefined,
        },
      });
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getLatestOrder(token: string) {
    try {
      const response = await authFetch.get(`/api/v1/order/latest`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getMyDocuments(token: string) {
    try {
      const response = await authFetch.get(`/api/v1/order/user-documents`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async cancelOrder(token: string, orderId: string) {
    try {
      const response = await authFetch.patch(
        `/api/v1/order/cancel/${orderId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
