import React from "react";
import { IconButton, Text, HStack } from "@chakra-ui/react";

export const BlogPostActions = ({ isLiked, isSaved, onToggle, commentCount }) => {
  return (
    <HStack justify="space-between" align="center" mt={4} mb={4}>
      <HStack spacing={2}>
        <IconButton
          aria-label="Me gusta"
          variant={isLiked ? "solid" : "ghost"}
          colorScheme={isLiked ? "pink" : "gray"}
          size="sm"
        />
        <Text fontSize="sm">{commentCount}</Text>
        
        <IconButton
          aria-label="Comentarios"
          onClick={onToggle}
          variant="ghost"
          size="sm"
        />
      </HStack>
      
      <HStack>
        <IconButton
          aria-label="Compartir"
          variant="ghost"
          size="sm"
        />
        <IconButton
          aria-label="Guardar"
          variant={isSaved ? "solid" : "ghost"}
          colorScheme={isSaved ? "teal" : "gray"}
          size="sm"
        />
      </HStack>
    </HStack>
  );
};
