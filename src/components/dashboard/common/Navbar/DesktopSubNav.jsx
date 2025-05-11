import React from "react";
import { Link, Stack, Box, Text } from "@chakra-ui/react";

export default function DesktopSubNav({ label, subLabel, href }) {
  return (
    <Stack>
      <Link
        href={href}
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: "teal.100", color: "teal.800" }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text fontWeight={500}>{label}</Text>
            <Text fontSize={"sm"}>{subLabel}</Text>
          </Box>
        </Stack>
      </Link>
    </Stack>
  );
}
