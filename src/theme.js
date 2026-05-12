import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "white",
  useSystemColorMode: false,
};

// Define a gentle, modern color palette
const colors = {
  brand: {
    50: "#e3f9f0",
    100: "#c1efdf",
    200: "#9fe5cd",
    300: "#7ddabb",
    400: "#5bd1aa",
    500: "#39c799", // primary accent
    600: "#2fa57c",
    700: "#24805f",
    800: "#1a5b41",
    900: "#103424",
  },
};

// Global component style overrides for a subtle look
const components = {
  Button: {
    baseStyle: {
      borderRadius: "md",
      _focus: { boxShadow: "none" },
    },
  },
};

const theme = extendTheme({ config, colors, components });

export default theme;
