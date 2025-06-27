import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "white",  
  useSystemColorMode: false,  
};

const theme = extendTheme({ config });

export default theme;
