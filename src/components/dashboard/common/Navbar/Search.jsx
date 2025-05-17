// Search.jsx
import React from "react";
import {
  Box,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { Search as SearchIcon } from "lucide-react";

export default function Search({ searchText, onSearchChange, onSearchClick }) {
  return (
    <Box w="100%" mb={2}>
      <InputGroup size="md">
        <Input
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar posts..."
          borderRadius="full"
          bg={useColorModeValue("gray.100", "gray.700")}
          border="none"
          _focus={{
            boxShadow: "outline",
            bg: "white",
            borderColor: "teal.300"
          }}
          _hover={{
            bg: "gray.50"
          }}
        />
        <InputRightElement>
          <IconButton
            icon={<SearchIcon size={18} />}
            variant="ghost"
            colorScheme="teal"
            aria-label="Buscar"
            borderRadius="full"
            size="sm"
            onClick={onSearchClick}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
