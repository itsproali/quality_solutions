import { useQuery } from "@tanstack/react-query";
import { EventServices } from "../services/EventServices";

export const useEvents = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["events"],
    EventServices.getEvents,
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

export const useFeaturedEvents = () => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["featuredEvents"],
    EventServices.getFeaturedEvents,
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};
