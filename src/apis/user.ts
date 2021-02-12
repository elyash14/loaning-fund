import useSWR from "swr";
import fetcher from "./fetcher";

export const getUsers = () => {
  const { data, error } = useSWR(`/api/users`, fetcher);

  return {
    users: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
