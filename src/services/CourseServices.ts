import { ICourse } from "../Interfaces/Course.interface";
import authFetch from "./AxiosCommon";

export class CourseServices {
  static async getCourses({ searchTerm }: { searchTerm?: string }): Promise<{
    courses: ICourse[];
    total?: number;
    page?: number;
    limit?: number;
  }> {
    try {
      const response = await authFetch.get("/api/v1/course", {
        params: {
          searchTerm,
        },
      });
      return response?.data?.result;
    } catch (error) {
      return error;
    }
  }

  static async getFeaturedCourses(): Promise<ICourse[]> {
    try {
      const response = await authFetch.get("/api/v1/course/featured");
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getSingleCourseInfo(id: string): Promise<ICourse> {
    try {
      const response = await authFetch.get(`/api/v1/course/details/${id}`);
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getSingleCourse(id: string, token?: string) {
    try {
      const response = await authFetch.get(`/api/v1/course/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data.result;
    } catch (error) {
      return error;
    }
  }

  static async getMyCourses(token: string) {
    try {
      const response = await authFetch.get(`/api/v1/order/user-courses`, {
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

  static async getChapters({
    courseId,
    token,
  }: {
    courseId?: string;
    token: string;
  }) {
    try {
      const { data: chapters } = await authFetch.get("/api/v1/chapter", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: {
          course: courseId ? courseId : undefined,
          displayType: 10,
        },
      });
      return chapters.result;
    } catch (error: any) {
      throw Error(error.response.data.msg);
    }
  }

  static async getSingleVideo(id: string, token?: string) {
    try {
      const response = await authFetch.get(`/api/v1/video/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      return response.data.result;
    } catch (error) {
      return error;
    }
  }
}
