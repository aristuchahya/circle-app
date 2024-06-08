import { extendTheme } from "@chakra-ui/react";

const font = {
  fonts: {
    heading: `'Plus Jakarta Sans', san-serif`,
    body: `'Plus Jakarta Sans', san-serif`,
  },
};

const colors = {
  brand: {
    primary: "#04A51E",
    secondary: "#005E0E",
  },
};

export const theme = extendTheme({ font, colors });
