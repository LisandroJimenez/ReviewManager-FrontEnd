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
  Input,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import { CommentItem } from "./CommentItem";
import { useAddComment } from "../../../shared/hooks/useComments";
import { validateCommentInput } from "../../../shared/validators/commentValidator";

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
  const [user, setUser] = useState("");
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [editingUser, setEditingUser] = useState("");

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);
  const remainingComments = comments.length - 2;

  const handlePublishComment = async () => {
    const validationErrors = validateCommentInput({ user, description: commentText });
    if (Object.keys(validationErrors).length > 0) {
      const firstError = validationErrors.user || validationErrors.description;
      toast({
        title: firstError,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (postId) {
      const newComment = await addPostComment(postId, commentText, user);
      if (newComment) {
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        setUser("");
        setShowAllComments(true);
        toast({
          title: "Comentario publicado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment._id);
    setEditingText(comment.description);
    setEditingUser(comment.user);
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
    setEditingUser("");
  };

  const handleEditComment = async () => {
    const validationErrors = validateCommentInput({ user: editingUser, description: editingText });
    if (Object.keys(validationErrors).length > 0) {
      const firstError = validationErrors.user || validationErrors.description;
      toast({
        title: firstError,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedComment = await editPostComment(editingCommentId, editingText, editingUser);
    if (updatedComment) {
      setComments((prev) =>
        prev.map((c) => (c._id === editingCommentId ? updatedComment : c))
      );
      cancelEditing();
    }
  };

  return (
    <Box mt={4}>
      <Input
        placeholder="Tu nombre"
        size="md"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        mb={3}
      />

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
        <Box
          key={comment._id || `temp-${Math.random()}`}
          mb={3}
          p={2}
          borderWidth="1px"
          borderRadius="md"
        >
          {editingCommentId === comment._id ? (
            <>
              <Input
                placeholder="Tu nombre"
                size="sm"
                value={editingUser}
                onChange={(e) => setEditingUser(e.target.value)}
                mb={2}
              />

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
