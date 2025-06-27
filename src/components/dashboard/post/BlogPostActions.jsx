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
  FaComment
} from "react-icons/fa";
import { useColorModeValue } from "@chakra-ui/react";

export const BlogPostActions = ({
  isLiked,
  isSaved,
  onToggleComments,
  commentCount,
  onLike,
  onSave,
  likeCount = 0,
}) => {
  // Theme colors
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  const buttonBg = useColorModeValue('gray.50', 'gray.700');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.600');

  return (
    <Box>
      <Divider my={4} borderColor={dividerColor} />
      
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
                borderRadius="full"
                _hover={{ 
                  transform: 'scale(1.1)',
                  bg: isLiked ? 'pink.50' : buttonHoverBg
                }}
                transition="all 0.2s ease"
              />
              <Text 
                fontSize="sm" 
                fontWeight="medium" 
                color={isLiked ? "pink.500" : textColor}
              >
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
                borderRadius="full"
                _hover={{ 
                  transform: 'scale(1.1)',
                  bg: commentCount > 0 ? 'blue.50' : buttonHoverBg
                }}
                transition="all 0.2s ease"
              />
              <Text 
                fontSize="sm" 
                fontWeight="medium" 
                color={commentCount > 0 ? "blue.500" : textColor}
              >
                {commentCount}
              </Text>
            </Flex>
          </Tooltip>
        </HStack>
      </Flex>
      
      <Divider my={4} borderColor={dividerColor} />
      
      <Button
        variant="outline"
        size="sm"
        width="full"
        leftIcon={<FaComment />}
        onClick={onToggleComments}
        borderRadius="full" 
        colorScheme="blue"
        borderColor={useColorModeValue('blue.200', 'blue.600')}
        color={useColorModeValue('blue.600', 'blue.300')}
        bg={useColorModeValue('blue.50', 'gray.700')}
        _hover={{
          bg: useColorModeValue('blue.100', 'gray.600'),
          transform: 'translateY(-1px)',
          borderColor: useColorModeValue('blue.300', 'blue.500')
        }}
        transition="all 0.2s ease"
      >
        {commentCount > 0 
          ? `Ver ${commentCount} comentario${commentCount !== 1 ? 's' : ''}` 
          : "Comentar"}
      </Button>
    </Box>
  );
};