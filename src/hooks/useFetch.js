import useSWR from "swr";
import customAPI from "@/services/api";

// Fetcher function for SWR
const fetcher = (url) => customAPI.get(url).then((res) => res.data);

const useFetch = (endpoint, options = {}) => {
  // Use SWR for fetching data with optional configurations
  const { data, error, mutate } = useSWR(endpoint, fetcher, options);

  return {
    data,
    error,
    isLoading: !error && !data,
    mutate,
  };
};

export default useFetch;
