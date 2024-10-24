"use client";
import React from "react";

// Define the hook with generic types for Body and Response
function useMutation<BodyType, ResponseType>(
  url: string,
  options?: {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: unknown) => void;
    onSettled?: () => void;
  }
) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [data, setData] = React.useState<ResponseType | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);
  const [status, setStatus] = React.useState<number | string>(200);

  const mutate = async (body: BodyType) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authentication: "",
        },
      });

      const responseData = (await response.json()) as ResponseType;
      setStatus(response.status);

      if (!response.ok) {
        throw new Error(responseData as unknown as string);
      }

      setData(responseData);
      if (options?.onSuccess) options.onSuccess(responseData);
    } catch (err) {
      setIsError(true);
      setError(err);
      if (options?.onError) options.onError(err);
    } finally {
      setIsLoading(false);
      if (options?.onSettled) options.onSettled();
    }
  };

  return { mutate, isLoading, isError, data, error, status };
}

export default useMutation;
