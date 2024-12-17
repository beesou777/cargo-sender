import { useEffect, useState } from "react";

export function useSSR() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return { isClient };
}
