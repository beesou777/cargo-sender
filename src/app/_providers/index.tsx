"use client";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
// styles
import "../globals.scss";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import { PropsWithChildren, useState } from "react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Provider({ children }: PropsWithChildren<unknown>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Notifications position="bottom-right" limit={5} autoClose={8000} />
          {children}
        </MantineProvider>
      </QueryClientProvider>
    </>
  );
}
