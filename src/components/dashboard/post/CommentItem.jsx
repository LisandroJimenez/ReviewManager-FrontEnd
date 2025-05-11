import React from "react";
import { Box, Avatar, Text, Button, Flex } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

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
          <Text fontSize="sm">{comment.text}</Text>
          <Flex mt={2} fontSize="xs" color="gray.600">
            <Button
              variant="ghost"
              size="xs"
              leftIcon={<FaHeart />}
              color={isCommentLiked ? "pink.500" : "gray.600"}
              onClick={onLikeComment}
            >
              {isCommentLiked ? likesCount + 1 : likesCount} Me gusta
            </Button>
            <Button variant="ghost" size="xs">
              Responder
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};