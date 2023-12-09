import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "../services/CategoryService";

export const useCategoryById = (id: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["category", id],
    async () => {
      const response = await CategoryService.getCategoryById(id);
      return response;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
