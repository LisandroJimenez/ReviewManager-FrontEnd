import React from "react";
import { Avatar, Stack, Text, HStack } from "@chakra-ui/react";

export const BlogPostMeta = ({ authorName, authorImage, date }) => {
  return (
    <HStack justifyContent="flex-start" alignItems="center" mb={4}>
      <Avatar src={authorImage} size="xs" mr={2} />
      <Stack direction="column" spacing={0} fontSize="sm">
        <Text fontWeight={600}>{authorName}</Text>
        <Text color="gray.600">{date}</Text>
      </Stack>
    </HStack>
  );
};