import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "../services/ServicesService";

export const useServices = ({ category }: { category?: string }) => {
  const { data, isLoading, isFetching, error } = useQuery(
    ["services", category],
    () => ServicesService.getServices(category),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  return { data, isLoading, isFetching, error };
};
