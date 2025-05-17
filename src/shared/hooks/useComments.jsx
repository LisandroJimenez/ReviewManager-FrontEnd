import { useState } from "react";
import toast from "react-hot-toast";
import {
  addComments as addCommentRequest,
  editComments as editCommentRequest,
  deleteComments as deleteCommentRequest,
} from "../../services";

export const useAddComment = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [isDeletingComment, setIsDeletingComment] = useState(false); 

  const addPostComment = async (postId, commentDescription, user) => {
    setIsAddingComment(true);
    const result = await addCommentRequest(postId, {
      description: commentDescription,
      user,
    });
    setIsAddingComment(false);

    if (result?.error) {
      console.error("Error al agregar comentario:", result);
      toast.error(result.msg || "Error al agregar comentario.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return null;
    }

    toast.success("Comentario agregado exitosamente.");
    return result.data.comment;
  };

  const editPostComment = async (commentId, newCommentDescription, newUser) => {
    setIsEditingComment(true);
    const result = await editCommentRequest(commentId, {
      description: newCommentDescription,
      user: newUser, 
    });
    setIsEditingComment(false);

    if (result?.error) {
      console.error("Error al editar comentario:", result);
      toast.error(result.msg || "Error al editar comentario.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return null;
    }

    toast.success("Comentario editado exitosamente.");
    return result.data.comment;
  };


  const deletePostComment = async (commentId) => {
    setIsDeletingComment(true);
    const result = await deleteCommentRequest(commentId);
    setIsDeletingComment(false);

    if (result?.error) {
      console.error("Error al eliminar comentario:", result);
      toast.error(result.msg || "Error al eliminar comentario.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return null;
    }

    toast.success("Comentario eliminado exitosamente.");
    return true;
  };

  return {
    isAddingComment,
    addPostComment,
    isEditingComment,
    editPostComment,
    isDeletingComment,
    deletePostComment,
  };
};