"use client";
import { tailwindColors } from "@/utils/colors";
import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "indigo",
  colors: tailwindColors,
  primaryShade: 6,
});
