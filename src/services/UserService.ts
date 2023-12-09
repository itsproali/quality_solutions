import { IUser } from "../Interfaces/Account.interface";
import authFetch from "./AxiosCommon";

export class UserService {
  static async createUser(user: any) {
    try {
      const response = await authFetch.post("/api/v1/user/register", user);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  static async getSingleUser(token: string) {
    try {
      const response = await authFetch.get<{ result: IUser }>(`/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async updateUser(user: Partial<IUser>, token: string) {
    try {
      const response = await authFetch.patch<{ result: IUser }>(
        `/api/v1/user`,
        user,
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

  static async changePassword(
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    token: string
  ) {
    try {
      const response = await authFetch.patch<{ result: IUser }>(
        `/api/v1/user/change-password`,
        { oldpassword: oldPassword, newpassword: newPassword },
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
}
