import { useEffect, useState } from "react";

export default function useFetchData<T>(
  promise: (...args: any) => Promise<T>,
  params: any[],
  deps?: any[]
) {
  const [data, setData] = useState<{ data: null | T; isLoading: boolean }>({
    data: null,
    isLoading: true,
  });

  useEffect(
    () => {
      setData({ data: null, isLoading: true });
      promise
        .apply(null, params)
        .then((value) => {
          setData({ data: value, isLoading: false });
        })
        .catch((err) => {
          setData({ data: err, isLoading: false });
        });
    },
    deps ? [...deps] : []
  );

  return data;
}
