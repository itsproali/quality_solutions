import { IProduct } from "../Interfaces/Product.interface";
import { IAllGetResponse } from "../Interfaces/common.interface";
import authFetch from "./AxiosCommon";

export class ProductServices {
  static async getProducts(
    category?: string,
    featured?: boolean
  ): Promise<IAllGetResponse<IProduct>> {
    try {
      const response = await authFetch.get("/api/v1/product", {
        params: {
          category: category ? category : undefined,
          featured: featured ? featured : undefined,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
  static async getRecommendedProducts(page: number, id: string) {
    try {
      const response = await authFetch.get<IAllGetResponse<IProduct>>(
        "/api/v1/product/recommended/" + id,
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
  static async getProduct(id: string) {
    try {
      const response = await authFetch.get<{ result: IProduct }>(
        "/api/v1/product/" + id
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getPurchasedDocuments(
    id: string,
    token: string
  ): Promise<{
    _id: string;
    type: string;
    title: string;
    image: string;
    document: string;
    thumbnail: string;
  }> {
    try {
      const response = await authFetch.get("/api/v1/product/purchased/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.result;
    } catch (error) {
      return error;
    }
  }
}
