import { useEffect, useState } from "react";

export default function useFetchData<T>(
  promise: (...args: any) => Promise<T>,
  params?: any[],
  deps?: any[]
) {
  const [data, setData] = useState<{
    data: null | T;
    message: null | T;
    isLoading: boolean;
  }>({
    data: null,
    message: null,
    isLoading: true,
  });

  useEffect(
    () => {
      setData({ data: null, message: null, isLoading: true });
      promise
        .apply(null, params || [])
        .then((value) => {
          setData({ data: value, message: null, isLoading: false });
        })
        .catch((err) => {
          setData({ data: null, message: err, isLoading: false });
        });
    },
    deps ? [...deps] : []
  );

  return data;
}
