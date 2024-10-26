"use client";
import React from "react";

function useQuery<T>(url: string, dependency: any[] = []) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<T>();
  const [error, setError] = React.useState<unknown>();
  const [status, setStatus] = React.useState<number | string>(200);

  const getData = async () => {
    const response = await fetch(url);
    setStatus(response.status);
    const data = (await response.json()) as T;
    setStatus(response.status)
    if (!response.ok) {
      setIsError(true);
      setIsLoading(false);
      setError(data);
    } else {
      setIsLoading(false);
      setData(data);
    }
  };

  React.useEffect(() => {
    if (!url || url?.includes("null")) return
    getData();
  }, dependency);

  return { isLoading, isError, data, error, status };
}

export default useQuery;
