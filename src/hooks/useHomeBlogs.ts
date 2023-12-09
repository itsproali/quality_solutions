import { useQuery } from "@tanstack/react-query";
import { getHomePageBlogs } from "../Data/getBlogs";

export const useHomeBlogs = () => {
  const { data, isLoading, error } = useQuery(
    ["homeBlogs"],
    () => getHomePageBlogs(),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  return { data, isLoading, error };
};
