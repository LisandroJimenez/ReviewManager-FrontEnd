import React from "react";
import { Box, Avatar, Text, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

export const CommentItem = ({ comment, onLikeComment, isCommentLiked }) => {
  const likesCount = comment.likes || 0;
  
  // Theme colors
  const textColor = useColorModeValue('gray.800', 'gray.200');
  const authorColor = useColorModeValue('gray.900', 'white');
  const dateColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box>
      <Flex alignItems="flex-start" mb={2}>
        <Avatar 
          src={comment.author?.image} 
          size="sm" 
          mr={3}
          bg={useColorModeValue('gray.200', 'gray.600')}
        />
        <Box flex="1">
          <Flex justifyContent="space-between" alignItems="center" mb={1}>
            <Text 
              fontWeight="bold" 
              fontSize="sm"
              color={authorColor}
            >
              {comment.user || "Anónimo"}
            </Text>
            <Text 
              fontSize="xs" 
              color={dateColor}
            >
              {new Date(comment.createdAt).toLocaleDateString()}
            </Text>
          </Flex>

          <Text 
            fontSize="sm" 
            color={textColor}
            lineHeight="1.5"
          >
            {comment.description}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};
