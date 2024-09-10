import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { PropsWithChildren } from "react";
import { theme } from "./theme";

export function Provider({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </>
  );
}
