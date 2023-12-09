import { AddressWithoutId, IAddress } from "../Interfaces/Account.interface";
import { IAllGetResponse } from "../Interfaces/common.interface";
import authFetch from "./AxiosCommon";

export class AddressService {
  static async createAddress(address: AddressWithoutId, token: string) {
    try {
      const response = await authFetch.post("/api/v1/address", address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getAllAddress(token: string) {
    try {
      const response = await authFetch.get<IAllGetResponse<IAddress>>(
        `/api/v1/address`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getSingleAddress(id: string, token: string) {
    try {
      const response = await authFetch.get<{ result: IAddress }>(
        `/api/v1/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async updateAddress(
    id: string,
    address: Partial<IAddress>,
    token: string
  ) {
    try {
      const response = await authFetch.patch<{ result: IAddress }>(
        `/api/v1/address/${id}`,
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async deleteAddress(id: string, token: string) {
    try {
      const response = await authFetch.delete<{ message: string }>(
        `/api/v1/address/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
