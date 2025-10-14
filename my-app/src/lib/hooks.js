import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useRiwayat() {
  const { data, error, isLoading, mutate } = useSWR("/api/riwayat", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return {
    riwayat: data,
    isLoading,
    isError: error,
    mutate,
  };
}
