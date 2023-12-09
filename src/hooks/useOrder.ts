import { useQuery } from "@tanstack/react-query";
import { CartService } from "../services/CartServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { OrderService } from "../services/OrderService";

export const useOrder = ({ status }: { status?: string } = {}) => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    ["order", status],
    () => OrderService.getOrder(session?.accessToken, { status }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      keepPreviousData: true,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, error, refetch };
};

export const useLatestOrder = () => {
  const { data: session } = useSession();
  const { data, isLoading, isFetching, error } = useQuery(
    ["latest-order"],
    () => OrderService.getLatestOrder(session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );

  return { data, isLoading, isFetching, error };
};

export const useMyDocument = () => {
  const { data: session } = useSession();

  const { data, isLoading, isFetching, error } = useQuery(
    ["my-documents"],
    () => OrderService.getMyDocuments(session?.accessToken),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!session?.accessToken,
    }
  );

  // useEffect(() => {
  //   if (data) {
  //     const newDocuments = data.map((item: any) => item.orderItems);
  //     setDocuments(newDocuments);
  //   }
  // }, [data]);

  return { data, isLoading, isFetching, error };
};
