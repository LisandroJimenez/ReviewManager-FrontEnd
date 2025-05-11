import React from "react";
import { Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Text
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      color={useColorModeValue("teal.600", "teal.200")}
      fontWeight="bold"
      fontSize="xl"
    >
      BlogApp
    </Text>
  );
}
