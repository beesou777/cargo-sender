import { MantineProvider } from "@mantine/core";
import { PropsWithChildren } from "react";
import { theme } from "./theme";

export function Provider({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </>
  );
}
