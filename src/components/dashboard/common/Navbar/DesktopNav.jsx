// DesktopNav.jsx
import React from "react";
import {
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DesktopSubNav from "./DesktopSubNav";
import { useCategories } from "../../../../shared/hooks/useCategories";
import { NAV_ITEMS } from "./navItems";

export default function DesktopNav({ onSelectCategory }) {
  const { categories } = useCategories();

  const handleSelectAllCategories = () => {
    if (onSelectCategory) {
      onSelectCategory(null); // Pasar null o undefined para indicar "todas las categorías"
    }
  };

  return (
    <Stack direction="row" spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => {
        if (navItem.label === "Categorías") {
          return (
            <Popover key={navItem.label} trigger="hover" placement="bottom-start">
              <PopoverTrigger>
                <Link
                  p={2}
                  href="#"
                  fontSize="sm"
                  fontWeight={500}
                  color="gray.600"
                  _hover={{ textDecoration: "none", color: "blue.400" }}
                >
                  {navItem.label} <ChevronDownIcon />
                </Link>
              </PopoverTrigger>

              <PopoverContent border={0} boxShadow="xl" bg="white" p={4} rounded="xl" minW="sm">
                <Stack spacing={3}>
                  <DesktopSubNav
                    label="Todas las categorías"
                    href="#"
                    onClick={handleSelectAllCategories}
                  />
                </Stack>
                  {categories.map((cat) => (
                    
                    <DesktopSubNav
                      key={cat._id}
                      label={cat.name}
                      subLabel={cat.description || ""}
                      href="#"
                      onClick={() => onSelectCategory(cat._id)}
                    />
                  ))}
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
            fontWeight={500}
            color="gray.600"
            _hover={{ textDecoration: "none", color: "blue.400" }}
          >
            {navItem.label}
          </Link>
        );
      })}
    </Stack>
  );
}