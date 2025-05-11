import React from "react";
import { Avatar, Stack, Text, HStack, Badge } from "@chakra-ui/react";

export const BlogPostMeta = ({ post }) => {
  return (
    <HStack justifyContent="space-between" alignItems="center" mb={4}>
      <HStack>
        <Avatar src={ ""} size="sm" />
        <Stack direction="column" spacing={0} fontSize="sm">
          <Text fontWeight={600}>{ "Autor desconocido"}</Text>
          <Text color="gray.500">
            {"Fecha no disponible"} 
          </Text>
        </Stack>
      </HStack>
    </HStack>
  );
};
