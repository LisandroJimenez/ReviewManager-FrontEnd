import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { CommentItem } from "./CommentItem";
import { useAddComment } from "../../../shared/hooks/useComments";

export const CommentSection = ({
  postId,
  comments,
  setComments,
  showAllComments,
  setShowAllComments,
  onLikeComment,
  likedComments,
}) => {
  const {
    isAddingComment,
    addPostComment,
    isEditingComment,
    editPostComment,
    isDeletingComment,
    deletePostComment,
  } = useAddComment();

  const toast = useToast();
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;



  const handlePublishComment = async () => {
    if (postId && commentText.trim()) {
      const newComment = await addPostComment(postId, commentText);
      if (newComment) {
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setShowAllComments(true)
        toast({
          title: "Comentario publicado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Por favor, escribe un comentario.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.description);
  };

  const handleDeleteComment = async (commentId) => {
    const deleted = await deletePostComment(commentId);
    if (deleted) {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    }
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleEditComment = async () => {
    if (editingText.trim()) {
      const updatedComment = await editPostComment(editingCommentId, editingText);
      if (updatedComment) {
        setComments((prev) =>
          prev.map((c) => (c._id === editingCommentId ? updatedComment : c))
        );
        cancelEditing();
      }
    } else {
      toast({
        title: "El comentario no puede estar vacío.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4}>
      {/* Formulario para agregar comentario */}
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

      {/* Lista de comentarios */}
      {displayedComments.map((comment) => (
        <Box
          key={comment._id || `temp-${Math.random()}`}
          mb={3}
          p={2}
          borderWidth="1px"
          borderRadius="md"
        >
          {editingCommentId === comment._id ? (
            <>
              <Textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                size="sm"
                mb={2}
              />
              <HStack spacing={2}>
                <Button
                  size="sm"
                  colorScheme="green"
                  leftIcon={<FiCheck />}
                  onClick={handleEditComment}
                  isLoading={isEditingComment}
                >
                  Guardar
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  leftIcon={<FiX />}
                  onClick={cancelEditing}
                >
                  Cancelar
                </Button>
              </HStack>
            </>
          ) : (
            <>
              <CommentItem
                comment={comment}
                onLikeComment={() => onLikeComment(comment._id)}
                isCommentLiked={likedComments.includes(comment._id)}
              />
              <Flex mt={2} justify="flex-end" gap={2}>
                <IconButton
                  aria-label="Editar comentario"
                  icon={<FiEdit2 />}
                  size="sm"
                  onClick={() => startEditing(comment)}
                />
                <IconButton
                  aria-label="Borrar comentario"
                  icon={<FiTrash2 />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              </Flex>
            </>
          )}
        </Box>
      ))}

      {comments.length > 2 && (
        <Button
          variant="ghost"
          size="sm"
          width="full"
          mt={2}
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {showAllComments
            ? "Mostrar menos comentarios"
            : `Ver ${remainingComments} comentarios más`}
        </Button>
      )}
    </Box>
  );
};
