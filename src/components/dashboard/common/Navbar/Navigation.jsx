import React from "react";
import DesktopNav from "./DesktopNav";
import { Stack, Flex } from "@chakra-ui/react";
import Search from "./Search";

export default function Navigation({ isMobile }) {
  return (
    <>
      {isMobile ? (
        <Stack spacing={4}>
          <DesktopNav isMobile={true} /> {/* Pasar la prop a DesktopNav */}
          <Search />
        </Stack>
      ) : (
        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav />
        </Flex>
      )}
    </>
  );
}