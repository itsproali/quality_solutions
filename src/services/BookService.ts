import { IBook } from "../Interfaces/Book.interface";
import { IAllGetResponse } from "../Interfaces/common.interface";
import authFetch from "./AxiosCommon";

export class BookService {
  static async getBooks({ category }: { category?: string }) {
    try {
      const { data: books } = await authFetch.get<IAllGetResponse<IBook>>(
        "/api/v1/book",
        {
          params: {
            category: category || undefined,
          },
        }
      );
      return books.result;
    } catch (error: any) {
      throw Error(error.response.data.message);
    }
  }

  static async getSingleBook(id: string) {
    try {
      const { data: book } = await authFetch.get<{ result: IBook }>(
        `/api/v1/book/${id}`
      );
      return book.result;
    } catch (error: any) {
      throw Error(error.response.data.message);
    }
  }
}
