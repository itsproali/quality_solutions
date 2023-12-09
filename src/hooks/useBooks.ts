import { useQuery } from "@tanstack/react-query";
import { BookService } from "../services/BookService";

export const useBooks = ({ category }: { category?: string }) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["books", category],
    () => BookService.getBooks({ category }),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
    }
  );

  return { data, isLoading, isFetching, isError, error };
};

export const useSingleBook = (id: string) => {
  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["books", id],
    () => BookService.getSingleBook(id),
    {
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: false,
      enabled: !!id,
    }
  );
  return { data, isLoading, isFetching, isError, error };
};
