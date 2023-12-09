import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { CartService } from "../services/CartServices";

export const useCart = () => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, error } = useQuery(
    ["cart"],
    () => CartService.getCarts(session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 5,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, error };
};
