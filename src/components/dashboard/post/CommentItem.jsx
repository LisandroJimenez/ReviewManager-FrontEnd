import React, { useState } from "react";
import { Box, Avatar, Text, Button, Flex } from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa"; // ícono de corazón

export const CommentItem = ({ comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likesCount = comment.likes || 0;
  
  return (
    <Box p={2} mb={2} bg="gray.50" borderRadius="md">
      <Flex mb={2}>
        <Avatar src={comment.author?.image || ""} size="xs" mr={2} />
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold" fontSize="sm">
              {comment.author?.name || "Usuario Anónimo"}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </Text>
          </Flex>
          <Text fontSize="sm" mt={1}>
            {comment.text}
          </Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" fontSize="xs">
        <Button
          variant="ghost"
          size="xs"
          leftIcon={<FaHeart />}
          color={isLiked ? "pink.500" : "gray.500"}
        >
          {isLiked ? likesCount + 1 : likesCount} Me gusta
        </Button>
        <Button variant="ghost" size="xs">
          Responder
        </Button>
      </Flex>
    </Box>
  );
};
