import { useQuery } from "@tanstack/react-query";
import { ProductServices } from "../services/ProductServices";

export const useRecommendedProducts = ({
  id,
  page,
}: {
  id: string;
  page: number;
}) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["recommendedProducts", id, page],
    () => ProductServices.getRecommendedProducts(page, id),
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
