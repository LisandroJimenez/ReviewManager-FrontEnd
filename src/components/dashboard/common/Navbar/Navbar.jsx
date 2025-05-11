import React, { useState } from "react";
import { Box, Flex, IconButton, Collapse, useDisclosure } from "@chakra-ui/react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserActions from "./UserActions";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Navbar() {
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
            display={{ md: "none" }} // Mostrar solo en mobile
            onClick={onToggle}
            mr={2}
            variant="ghost"
          />
          <Logo />
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}>
          <Navigation />
        </Flex>
        <UserActions />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box bg="white" borderBottom="1px solid" borderColor="gray.200" p={4} display={{ md: 'none' }}>
          <Navigation isMobile={true} /> {/* Renderizar una versión vertical de la navegación */}
        </Box>
      </Collapse>
    </Box>
  );
}