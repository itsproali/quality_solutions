import { useQuery } from "@tanstack/react-query";
import { AddressService } from "../services/AddressService";
import { useSession } from "next-auth/react";

export const useAddresses = () => {
  const { data: session } = useSession();

  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["address"],
    () => AddressService.getAllAddress(session?.accessToken),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};
