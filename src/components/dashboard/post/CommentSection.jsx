import React, { useState } from "react"; // Importa useState si lo necesitas aquí
import { Button, Textarea, Box, Divider, Text, Flex, useToast } from "@chakra-ui/react";
import { CommentItem } from "./CommentItem";
import { useAddComment } from "../../../shared/hooks/useComments"; // Importa el hook

export const CommentSection = ({
  postId,
  comments,
  setComments,
  showAllComments,
  setShowAllComments,
  onLikeComment,
  likedComments,
}) => {
  const { isAddingComment, addPostComment } = useAddComment();
  const toast = useToast();
  const [commentText, setCommentText] = useState(""); // Estado local para el input del comentario
  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;

  const handlePublishComment = async () => {
    if (postId && commentText.trim()) {
      const newCommentData = await addPostComment(postId, commentText);
      if (newCommentData) {
        setComments((prevComments) => [...prevComments, newCommentData]);
        setCommentText("");
        toast({
          title: "Comentario publicado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } else if (!commentText.trim()) {
      toast({
        title: "Por favor, escribe un comentario.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error al publicar el comentario.",
        description: "No se pudo obtener el ID de la publicación.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
          onClick={handlePublishComment}
          isLoading={isAddingComment}
          isDisabled={!commentText.trim()}
        >
          Comentar
        </Button>
      </Flex>

      <Divider my={4} />

      {displayedComments.map((comment) => (
        <CommentItem
          key={comment._id || `temp-${Math.random()}`}
          comment={comment}
          onLikeComment={() => onLikeComment(comment._id)}
          isCommentLiked={likedComments.includes(comment._id)}
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