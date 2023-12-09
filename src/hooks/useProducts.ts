import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { IProduct } from "../Interfaces/Product.interface";
import { IAllGetResponse } from "../Interfaces/common.interface";
import { ProductServices } from "../services/ProductServices";

export const useProducts = ({
  category,
  featured,
}: {
  category?: string;
  featured?: boolean;
}) => {
  const { data, isLoading, isFetching, isError, error } = useQuery<
    IAllGetResponse<IProduct>
  >(
    ["products", category],
    async () => {
      const response = await ProductServices.getProducts(category, featured);
      return response;
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
      // refetchOnMount: false,
      // initialData: products,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

export const useProduct = (id: string, skip?: boolean) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["product", id],
    () => ProductServices.getProduct(id),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !skip,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

export const usePurchaseDocuments = (id: string) => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["purchaseDocuments", id],
    () => ProductServices.getPurchasedDocuments(id, session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      enabled: !!session?.accessToken,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};
