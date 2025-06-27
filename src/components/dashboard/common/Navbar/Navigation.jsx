import React from "react";
import DesktopNav from "./DesktopNav";
import { Stack, Flex } from "@chakra-ui/react";
import Search from "./Search";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
export default function Navigation({ isMobile }) {

  const MotionBox = motion(Box);


  return (
    <>
      {isMobile ? (
        <Stack spacing={4}>
          <DesktopNav isMobile={true} />
          
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