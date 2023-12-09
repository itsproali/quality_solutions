import { useSession } from "next-auth/react";
import { UserService } from "../services/UserService";
import { useQuery } from "@tanstack/react-query";

export const useSingleUser = () => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, error } = useQuery(
    ["user"],
    () => UserService.getSingleUser(session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );
  return { data, isLoading, isFetching, error };
};
