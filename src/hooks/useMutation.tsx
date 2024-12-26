"use client";
import React from "react";
import { AxiosError } from "axios";
import { axiosInstance } from "@/utils/axios";

function useMutation<BodyType, ResponseType, ErrorResponseType>(
  url: string,
  options?: {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: ErrorResponseType | any) => void;
    onSettled?: () => void;
  }
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<ResponseType | any | null>(null);
  const [error, setError] = React.useState<ErrorResponseType | any | null>(
    null
  );
  const [status, setStatus] = React.useState<number>(200);

  const mutate = async (body: BodyType) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await axiosInstance().post<ResponseType>(url, body, {
        headers: {
          "Content-Type": "application/json",
          Authentication: "",
        },
      });

      setData(response.data);
      setStatus(response.status);

      if (options?.onSuccess) options.onSuccess(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setIsError(true);
      setError(axiosError);
      setStatus(axiosError.response?.status || 400);

      if (options?.onError) options.onError(axiosError.response?.data);
    } finally {
      setIsLoading(false);
      if (options?.onSettled) options.onSettled();
    }
  };

  return { mutate, isLoading, isError, data, error, status };
}

export default useMutation;
