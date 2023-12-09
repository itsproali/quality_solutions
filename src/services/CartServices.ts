import authFetch from "./AxiosCommon";

export class CartService {
  static async getCarts(token: string) {
    try {
      const response = await authFetch.get("/api/v1/cart", {
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
}
