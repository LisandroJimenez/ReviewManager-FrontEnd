import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useDisclosure,
  Stack,
  Link,
  HStack
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import UserActions from "./UserActions";
import DesktopNav from "./DesktopNav";
import { SunIcon, MoonIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

export default function Navbar({ onSelectCategory, onSearch }) {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const activeColor = useColorModeValue('blue.500', 'blue.300');
  const hoverColor = useColorModeValue('gray.600', 'gray.300');
  const textColor = useColorModeValue('gray.800', 'white');

  const navBg = useColorModeValue(
    'rgba(255, 255, 255, 0.95)',
    'rgba(26, 32, 44, 0.95)'
  );
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mobileBg = useColorModeValue(
    'rgba(255, 255, 255, 0.98)',
    'rgba(45, 55, 72, 0.98)'
  );

  return (
    <Box position="relative">
      <MotionFlex
        bg={navBg}
        backdropFilter="blur(10px)"
        color={useColorModeValue('gray.700', 'gray.200')}
        minH={"70px"}
        py={{ base: 3, md: 4 }}
        px={{ base: 6, md: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={borderColor}
        align={"center"}
        justifyContent="space-between"
        boxShadow={useColorModeValue(
          '0 2px 10px rgba(0,0,0,0.1)',
          '0 2px 10px rgba(0,0,0,0.3)'
        )}
        position="sticky"
        top={0}
        zIndex={1000}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Flex align="center" gap={3}>
          <MotionBox
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IconButton
              size="md"
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label="Abrir navegación"
              display={{ md: "none" }}
              onClick={onToggle}
              variant="ghost"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
              borderRadius="xl"
            />
          </MotionBox>
          <MotionBox
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Logo />
          </MotionBox>
        </Flex>

        <Flex display={{ base: "none", md: "flex" }} flex={1} justify="center">
          <DesktopNav onSelectCategory={onSelectCategory} isMobile={false} />
        </Flex>

        <HStack spacing={2}>
          <MotionBox
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <IconButton
              size="md"
              variant="ghost"
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
              onClick={toggleColorMode}
              borderRadius="xl"
              _hover={{
                bg: useColorModeValue('gray.100', 'gray.700'),
                transform: 'translateY(-1px)'
              }}
              transition="all 0.2s ease"
            />
          </MotionBox>
          <MotionBox
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserActions onSearch={onSearch} />
          </MotionBox>
        </HStack>
      </MotionFlex>

      <Collapse in={isOpen} animateOpacity>
        <MotionBox
          bg={mobileBg}
          backdropFilter="blur(10px)"
          borderBottom="1px solid"
          borderColor={borderColor}
          p={6}
          display={{ md: "none" }}
          boxShadow={useColorModeValue(
            '0 4px 12px rgba(0,0,0,0.1)',
            '0 4px 12px rgba(0,0,0,0.3)'
          )}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Stack spacing={4}>
            <DesktopNav onSelectCategory={onSelectCategory} isMobile={true} />
          </Stack>
        </MotionBox>
      </Collapse>
    </Box>
  );
}