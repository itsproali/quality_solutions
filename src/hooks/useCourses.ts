import { useQuery } from "@tanstack/react-query";
import { CourseServices } from "../services/CourseServices";
import { useSession } from "next-auth/react";

// Get all courses
export const useCourses = ({ searchTerm }: { searchTerm?: string }) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["courses", searchTerm],
    () => CourseServices.getCourses({ searchTerm }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

// Get featured courses
export const useFeaturedCourses = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["featuredCourses"],
    CourseServices.getFeaturedCourses,
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

// Get course info
export const useSingleCourseInfo = (id: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["courses", id],
    () => CourseServices.getSingleCourseInfo(id),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );
  return { data, isLoading, isFetching, isError, error };
};

// Get course chapters
export const useSingleCourse = (id: string) => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["singleCourse", id],
    () => CourseServices.getSingleCourse(id, session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );
  return { data, isLoading, isFetching, isError, error };
};

// Get my courses
export const useMyCourses = () => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["myCourses"],
    () => CourseServices.getMyCourses(session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

// Get Single Video
export const useSingleVideo = (id: string) => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["singleVideo", id],
    () => CourseServices.getSingleVideo(id, session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken && !!id,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

// Get Chapters & Videos
export const useChapters = ({ courseId }: { courseId?: string }) => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["chapters", courseId],
    () =>
      CourseServices.getChapters({
        courseId,
        token: session?.accessToken,
      }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};
