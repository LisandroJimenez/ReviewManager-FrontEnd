import React from "react";
import { Button, Textarea, Box, Stack, Text, Flex } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem";

export const CommentSection = ({
  comments,
  onAddComment,
  commentText,
  setCommentText,
  showAllComments,
  setShowAllComments,
}) => {
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;

  return (
    <Box mb={4}>
      <Textarea
        placeholder="Escribe un comentario..."
        size="sm"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        mb={2}
        resize="none"
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

      {displayedComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      {comments.length > 2 && (
        <Button
          variant="ghost"
          size="sm"
          width="full"
          mt={2}
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments ? "Mostrar menos" : `Ver ${remainingComments} comentarios más`}
        </Button>
      )}
    </Box>
  );
};
