import React from "react";
import {
  Stack,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Search() {
  return (
    <Stack flex={{ base: 1, md: 2 }} justify={"flex-end"} direction={"row"} spacing={6}>
      <InputGroup w={{ base: "60%", md: "40%" }} mx={2} display={{ base: "none", md: "flex" }}>
        <Input
          placeholder="Buscar posts..."
          borderRadius="full"
          bg={useColorModeValue("gray.100", "gray.700")}
        />
        <InputRightElement>
          <IconButton
            icon={<SearchIcon />}
            variant="ghost"
            aria-label="Buscar"
            borderRadius="full"
          />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
}
