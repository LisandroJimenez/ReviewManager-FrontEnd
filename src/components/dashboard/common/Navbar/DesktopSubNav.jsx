
// DesktopSubNav.jsx
import React from "react";
import { Link, Stack, Box, Text, Icon, Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function DesktopSubNav({ label, subLabel, href, onClick }) {
  return (
    <Link
      href={href}
      role="group"
      display="block"
      p={2}
      rounded="md"
      _hover={{ bg: "gray.50" }}
      onClick={onClick}
    >
      <Stack direction="row" align="center">
        <Box flex={1}>
          <Text
            transition="all .2s ease"
            _groupHover={{ color: "teal.500" }}
            fontWeight={500}
          >
            {label}
          </Text>
          {subLabel && (
            <Text fontSize="sm" color="gray.500">
              {subLabel}
            </Text>
          )}
        </Box>
        <Flex
          transition="all .2s ease"
          transform="translateX(-10px)"
          opacity={0}
          _groupHover={{ opacity: 1, transform: "translateX(0)" }}
          justify="flex-end"
          align="center"
        >
          <Icon color="teal.500" w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
}