import React from "react";
import { Button, Textarea, Box, Divider, Text, Flex } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem";

export const CommentSection = ({
  comments,
  onAddComment,
  commentText,
  setCommentText,
  showAllComments,
  setShowAllComments,
  onLikeComment,
  likedComments,
}) => {
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;

  return (
    <Box mt={4}>
      <Textarea
        placeholder="Escribe un comentario..."
        size="md"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        mb={3}
        resize="vertical"
      />
      <Flex justify="flex-end">
        <Button
          colorScheme="teal"
          size="sm"
          onClick={onAddComment}
          isDisabled={!commentText.trim()}
        >
          Comentar
        </Button>
      </Flex>

      <Divider my={4} />

      {displayedComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onLikeComment={() => onLikeComment(comment.id)}
          isCommentLiked={likedComments.includes(comment.id)}
        />
      ))}

      {comments.length > 2 && (
        <Button
          variant="ghost"
          size="sm"
          width="full"
          mt={2}
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? "Mostrar menos comentarios" : `Ver ${remainingComments} comentarios más`}
        </Button>
      )}
    </Box>
  );
};