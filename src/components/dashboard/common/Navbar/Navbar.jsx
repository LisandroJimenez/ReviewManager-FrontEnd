// Navbar.jsx
import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useDisclosure,
  Stack,
  // eslint-disable-next-line no-unused-vars
  Link,
  HStack
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import UserActions from "./UserActions";
import DesktopNav from "./DesktopNav";
// import Search from "./Search"; // Ya no es necesario importarlo aquí

export default function Navbar({ onSelectCategory, onSearch }) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box>
      <Flex
        bg="white"
        color="gray.600"
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor="gray.200"
        align={"center"}
        justifyContent="space-between"
      >
        <Flex align="center">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Abrir navegación"
            display={{ md: "none" }}
            onClick={onToggle}
            mr={2}
            variant="ghost"
          />
          <Logo />
        </Flex>

        <Flex display={{ base: "none", md: "flex" }} ml={10}>
          <DesktopNav onSelectCategory={onSelectCategory} isMobile={false} />
        </Flex>

        {/* Pasamos la función onSearch al componente UserActions */}
        <UserActions onSearch={onSearch} />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box
          bg="white"
          borderBottom="1px solid"
          borderColor="gray.200"
          p={4}
          display={{ md: "none" }}
        >
          <Stack spacing={4}>
            <DesktopNav onSelectCategory={onSelectCategory} isMobile={true} />
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}