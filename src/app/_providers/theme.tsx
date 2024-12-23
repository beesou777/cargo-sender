"use client";
import { tailwindColors } from "@/utils/colors";
import { createTheme, MantineThemeOverride, NumberInput } from "@mantine/core";

const customTheme: MantineThemeOverride = {
  primaryColor: "indigo",
  colors: tailwindColors,
  primaryShade: 6,
  components: {
    Input: {
      styles: (theme: any) => ({
        input: {
          borderColor: theme.colors.gray[2], // 'gray[1]' corresponds to `text-gray-100`
        },
        NumberInput: NumberInput.extend({
          classNames: {
            section: "mx-1",
          },
        }),
      }),
    },
  },
};

export const theme = createTheme(customTheme);
