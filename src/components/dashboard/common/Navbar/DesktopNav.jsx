
import React from "react";
import {
  Box,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
  Text,
  Tag,
  HStack,
  useDisclosure,
  Flex,
  Collapse
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Home, Grid, Award, BriefcaseIcon} from "lucide-react";
import DesktopSubNav from "./DesktopSubNav";
import { useCategories } from "../../../../shared/hooks/useCategories";
import { NAV_ITEMS } from "./NavItems";
import { useColorModeValue } from "@chakra-ui/react";


const MobileCategoryNav = ({ navItem, categories, onSelectCategory, textColor, NavIcon }) => {
const { isOpen, onToggle } = useDisclosure();  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const linkColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Stack spacing={1} w="100%">
      <Flex
        py={2}
        px={2}
        justify="space-between"
        align="center"
        _hover={{ textDecoration: 'none' }}
        cursor="pointer"
        onClick={onToggle}
      >
        <HStack spacing={2}>
          <Icon as={NavIcon} boxSize={4} color={textColor} />
          <Text fontWeight={600} color={textColor} fontSize="sm">
            {navItem.label}
          </Text>
        </HStack>
        <Icon
          as={ChevronDownIcon}
          transition={'all .25s ease-in-out'}
          transform={isOpen ? 'rotate(180deg)' : ''}
          w={4}
          h={4}
          color={textColor}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={1}
          pl={8}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={borderColor}
          align={'start'}
          w="100%"
        >
          <Link py={2} fontSize="sm" onClick={() => onSelectCategory(null)} color={linkColor}>
            Todas las categorías
          </Link>
          {categories.map((cat) => (
            <Link key={cat._id} py={2} fontSize="sm" onClick={() => onSelectCategory(cat._id)} color={linkColor}>
              {cat.name}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};



export default function DesktopNav({ onSelectCategory, isMobile = false }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();  
  const { categories } = useCategories();
  const textColor = useColorModeValue('gray.800', 'white');
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const hoverColor = useColorModeValue("teal.600", "teal.300");
  const dividerColor = useColorModeValue("gray.100", "gray.700");
  const subNavHoverBg = useColorModeValue("gray.50", "gray.700");
  const subNavTextColor = useColorModeValue("gray.800", "gray.100");
  const popoverBg = useColorModeValue("white", "gray.800");
  const handleSelectAllCategories = () => {
    if (onSelectCategory) {
      onSelectCategory(null);
    }
  };


  const getNavIcon = (label) => {
    switch (label) {
      case "Inicio":
        return Home;
      case "Categorías":
        return Grid;
      case "Regresar al Portafolio":
        return BriefcaseIcon;
      default:
        return Award;
    }
  };

  return (
    <Stack
      direction={isMobile ? "column" : "row"}
      spacing={isMobile ? 2 : 6}
      align={isMobile ? "flex-start" : "center"}
      ml={isMobile ? 0 : 4}
    >
      {NAV_ITEMS.map((navItem) => {
        const NavIcon = getNavIcon(navItem.label);

        if (navItem.label === "Categorías") {
          if (isMobile) {
            return (
              <MobileCategoryNav
                key={navItem.label}
                navItem={navItem}
                categories={categories}
                onSelectCategory={onSelectCategory}
                textColor={textColor}
                NavIcon={NavIcon}
              />
            );
          }
          
          return (
            <Popover key={navItem.label} isOpen={isOpen} onClose={onClose} closeOnBlur={true} placement="bottom-start">
              <PopoverTrigger>
                <Link
                  p={2}
                  fontSize="sm"
                  fontWeight={600}
                  color={textColor}
                  rounded="md"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  onClick={onToggle}
                  _hover={{
                    textDecoration: "none",
                    bg: hoverBg,
                    color: hoverColor
                  }}
                >
                  <HStack spacing={2}>
                    <Icon as={NavIcon} boxSize={4} />
                    <Text>{navItem.label}</Text>
                    <Icon as={ChevronDownIcon} boxSize={4} />
                  </HStack>
                </Link>
              </PopoverTrigger>

              <PopoverContent
                border={0}
                boxShadow="xl"
                bg={popoverBg}
                p={4}
                rounded="xl"
                minW="sm"
              >
                <Stack>
                  <Box pb={2} mb={2} borderBottom="1px" borderColor="gray.100">
                    <DesktopSubNav
                      label="Todas las categorías"
                      onClick={handleSelectAllCategories}

                    />
                  </Box>

                  <Stack spacing={0}>
                    {categories.map((cat, index) => (
                      <HStack
                        key={cat._id}
                        bg={useColorModeValue("white", "gray.800")}
                        _hover={{ bg: subNavHoverBg }}
                      >
                        <DesktopSubNav
                          label={cat.name}
                          subLabel={cat.description || ""}
                          onClick={() => onSelectCategory(cat._id)}
                        />
                      </HStack>

                    ))}
                  </Stack>
                </Stack>
              </PopoverContent>
            </Popover>
          );
        }

        return (
          <Link
            key={navItem.label}
            p={2}
            href={navItem.href}
            fontSize="sm"
            fontWeight={600}
            color={textColor}
            rounded="md"
            display="flex"
            alignItems="center"
            _hover={{
              textDecoration: "none",
              bg: hoverBg,
              color: hoverColor
            }}
          >
            <HStack spacing={2}>
              <Icon as={NavIcon} boxSize={4} />
              <Text>{navItem.label}</Text>
            </HStack>
          </Link>
        );
      })}
    </Stack>
  );
}