import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CategoryService } from "../services/CategoryService";

export const useCategory = () => {
  const [productCategory, setProductCategory] = useState<any>([]);
  const [serviceCategory, setServiceCategory] = useState<any>([]);
  const [bookCategory, setBookCategory] = useState<any>([]);

  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["category"],
    async () => {
      const response = await CategoryService.getActiveCategories();
      return response;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (data?.total) {
      setProductCategory(
        data?.data?.filter((item: any) => item.type === "product")
      );
      setServiceCategory(
        data?.data?.filter((item: any) => item.type === "service")
      );
      setBookCategory(data?.data?.filter((item: any) => item.type === "book"));
    }
  }, [data]);

  return {
    data: data,
    productCategory,
    serviceCategory,
    bookCategory,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
