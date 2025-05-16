import React from "react";
import { Box, Avatar, Text, Flex } from "@chakra-ui/react";

export const CommentItem = ({ comment, onLikeComment, isCommentLiked }) => {
  const likesCount = comment.likes || 0;

  return (
    <Box p={3} mb={3} bg="gray.50" borderRadius="md">
      <Flex alignItems="flex-start" mb={2}>
        <Avatar src={comment.author?.image} size="sm" mr={3} />
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={1}>
            <Text fontWeight="bold" fontSize="sm">
              {comment.author?.name || "Anónimo"}
            </Text>
            <Text fontSize="xs" color="gray.600">
              {new Date(comment.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
          <Text fontSize="sm">{comment.description}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
