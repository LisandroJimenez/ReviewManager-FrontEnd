import React from "react";
import { 
  IconButton, 
  Text, 
  HStack, 
  Flex, 
  Divider, 
  Tooltip,
  Box,
  Button
} from "@chakra-ui/react";
import { 
  FaHeart, 
  FaRegHeart, 
  FaComment, 
  FaShareAlt, 
  FaBookmark,
  FaRegBookmark 
} from "react-icons/fa";

export const BlogPostActions = ({
  isLiked,
  isSaved,
  onToggleComments,
  commentCount,
  onLike,
  onSave,
  likeCount = 0,
}) => {
  return (
    <Box>
      <Divider my={4} />
      
      <Flex 
        justify="space-between" 
        align="center" 
        wrap="wrap"
      >
        <HStack spacing={4}>
          <Tooltip label={isLiked ? "Quitar me gusta" : "Me gusta"}>
            <Flex align="center">
              <IconButton
                aria-label="Me gusta"
                variant="ghost"
                colorScheme={isLiked ? "pink" : "gray"}
                size="md"
                icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                onClick={onLike}
                mr={1}
              />
              <Text fontSize="sm" fontWeight="medium" color={isLiked ? "pink.500" : "gray.600"}>
                {likeCount + (isLiked ? 1 : 0)}
              </Text>
            </Flex>
          </Tooltip>
          
          <Tooltip label="Comentarios">
            <Flex align="center">
              <IconButton
                aria-label="Comentarios"
                variant="ghost"
                size="md"
                icon={<FaComment />}
                onClick={onToggleComments}
                mr={1}
                colorScheme={commentCount > 0 ? "blue" : "gray"}
              />
              <Text fontSize="sm" fontWeight="medium" color={commentCount > 0 ? "blue.500" : "gray.600"}>
                {commentCount}
              </Text>
            </Flex>
          </Tooltip>
        </HStack>
      </Flex>
      
      <Divider my={4} />
      
      <Button
        variant="outline"
        size="sm"
        width="full"
        leftIcon={<FaComment />}
        onClick={onToggleComments}
        borderRadius="full" 
        colorScheme="blue"
        opacity={0.8}
      >
        {commentCount > 0 
          ? `Ver ${commentCount} comentario${commentCount !== 1 ? 's' : ''}` 
          : "Comentar"}
      </Button>
    </Box>
  );
};