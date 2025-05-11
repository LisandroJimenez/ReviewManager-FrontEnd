import React from "react";
import { IconButton, Text, HStack } from "@chakra-ui/react";
import { FaHeart, FaComment, FaShareAlt, FaBookmark } from "react-icons/fa";

export const BlogPostActions = ({
  isLiked,
  isSaved,
  onToggleComments,
  commentCount,
  onLike,
  onSave,
}) => {
  return (
    <HStack justify="space-between" align="center" mt={4} mb={4}>
      <HStack spacing={2}>
        <IconButton
          aria-label="Me gusta"
          variant="ghost"
          colorScheme={isLiked ? "pink" : "gray"}
          size="md"
          icon={<FaHeart />}
          onClick={onLike}
        />
        <Text fontSize="sm">{commentCount}</Text>
        <IconButton
          aria-label="Comentarios"
          variant="ghost"
          size="md"
          icon={<FaComment />}
          onClick={onToggleComments}
        />
      </HStack>

      <HStack>
        <IconButton
          aria-label="Compartir"
          variant="ghost"
          size="md"
          icon={<FaShareAlt />}
        />
        <IconButton
          aria-label="Guardar"
          variant="ghost"
          colorScheme={isSaved ? "teal" : "gray"}
          size="md"
          icon={<FaBookmark />}
          onClick={onSave}
        />
      </HStack>
    </HStack>
  );
};