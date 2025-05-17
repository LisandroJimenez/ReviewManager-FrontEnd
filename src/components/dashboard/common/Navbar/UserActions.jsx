// UserActions.jsx
import {
  HStack,
} from "@chakra-ui/react";
import Search from "./Search";
import { useState } from "react";

export default function UserActions({ onSearch }) {
  const handleSearchClick = () => {
    onSearch(searchText);
  };

  const handleSearchChange = (newSearchText) => {

    setSearchText(newSearchText);
  };

  const [searchText, setSearchText] = useState("");

  return (
    <HStack spacing={3} alignItems="center">
      <Search
        searchText={searchText}
        onSearchChange={handleSearchChange}
        onSearchClick={handleSearchClick}
      />
    </HStack>
  );
}