import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/notifications/styles.css';

import { PropsWithChildren } from "react";
import { theme } from "./theme";

export function Provider({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <MantineProvider theme={theme}>
        <Notifications position="bottom-right" />
        {children}
      </MantineProvider>
    </>
  );
}
