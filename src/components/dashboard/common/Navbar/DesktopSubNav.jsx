// DesktopSubNav.jsx
import React from "react";
import { Link, Stack, Box, Text } from "@chakra-ui/react";

export default function DesktopSubNav({ label, subLabel, href, onClick }) {
  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: "gray.100" }}
      onClick={onClick}
    >
      <Stack direction="row" align="center">
        <Box>
          <Text
            transition="all .3s ease"
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize="sm">{subLabel}</Text>
        </Box>
      </Stack>
    </Link>
  );
}
