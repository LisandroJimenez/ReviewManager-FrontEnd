
// DesktopNav.jsx
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
  HStack
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Home, Grid, Award } from "lucide-react";
import DesktopSubNav from "./DesktopSubNav";
import { useCategories } from "../../../../shared/hooks/useCategories";
import { NAV_ITEMS } from "./navItems";

export default function DesktopNav({ onSelectCategory, isMobile = false }) {
  const { categories } = useCategories();

  const handleSelectAllCategories = () => {
    if (onSelectCategory) {
      onSelectCategory(null); // Pasar null o undefined para indicar "todas las categorías"
    }
  };

  // Función para obtener el color para cada categoría
  const getCategoryColor = (index) => {
    const colors = ["teal", "blue", "purple", "orange", "pink", "cyan", "green"];
    return colors[index % colors.length];
  };

  const getNavIcon = (label) => {
    switch (label) {
      case "Inicio": 
        return Home;
      case "Categorías": 
        return Grid;
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
          return (
            <Popover key={navItem.label} trigger="hover" placement="bottom-start">
              <PopoverTrigger>
                <Link
                  p={2}
                  href="#"
                  fontSize="sm"
                  fontWeight={600}
                  color="gray.700"
                  rounded="md"
                  display="flex"
                  alignItems="center"
                  _hover={{ 
                    textDecoration: "none", 
                    bg: "gray.50",
                    color: "teal.500"
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
                bg="white" 
                p={4} 
                rounded="xl" 
                minW="sm"
              >
                <Stack>
                  <Box pb={2} mb={2} borderBottom="1px" borderColor="gray.100">
                    <DesktopSubNav
                      label="Todas las categorías"
                      href="#"
                      onClick={handleSelectAllCategories}
                    />
                  </Box>
                  
                  <Stack spacing={0}>
                    {categories.map((cat, index) => (
                      <HStack key={cat._id}>
                        <DesktopSubNav
                          label={cat.name}
                          subLabel={cat.description || ""}
                          href="#"
                          onClick={() => onSelectCategory(cat._id)}
                        />
                        <Tag 
                          size="sm" 
                          colorScheme={getCategoryColor(index)}
                          ml={2} 
                          rounded="full"
                        >
                          {Math.floor(Math.random() * 30) + 1}
                        </Tag>
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
            href={navItem.href ?? "#"}
            fontSize="sm"
            fontWeight={600}
            color="gray.700"
            rounded="md"
            display="flex"
            alignItems="center"
            _hover={{ 
              textDecoration: "none", 
              bg: "gray.50",
              color: "teal.500" 
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