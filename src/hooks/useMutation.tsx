"use client";
import React from "react";

function useMutation<BodyType,ResponseType>(url: string, body:BodyType, dependency: any[] = []) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<ResponseType>();
  const [error, setError] = React.useState<unknown>();
  const [status, setStatus] = React.useState<number | string>(200);

  const getData = async () => {
    const response = await fetch(url,{
      method:"POST",
      body:JSON.stringify(body),
      headers:{
        Authentication:""
      }
    });
    const data = (await response.json()) as ResponseType;
    setStatus(response.status);
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
    getData();
  }, dependency);

  return { isLoading, isError, data, error, status };
}

export default useMutation;
