import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "../services/ServicesService";

export const useRecommendedServices = ({
  id,
  page,
}: {
  id: string;
  page: number;
}) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["recommendedProducts", id, page],
    () => ServicesService.getRecommendedServices(page, id),
    {
      refetchOnMount: false,
      keepPreviousData: true,
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
