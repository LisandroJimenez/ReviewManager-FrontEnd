import { useState } from "react";
import toast from "react-hot-toast";
import { addComments as addCommentRequest } from "../../services"; // Importa tu función de servicio para agregar comentarios

export const useAddComment = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const addPostComment = async (postId, commentDescription) => {
    setIsAddingComment(true);
    const result = await addCommentRequest(postId, { description: commentDescription });
    setIsAddingComment(false);

    if (result?.error) {
      console.error("Error al agregar comentario:", result);
      toast.error(result.msg || "Error al agregar comentario.", {
        style: {
          background: "red",
          color: "white",
        },
      });
      return null; // Indica que la operación falló
    }

    toast.success("Comentario agregado exitosamente.");
    return result.data; // Devuelve la data del nuevo comentario (si la API lo retorna)
  };

  return {
    isAddingComment,
    addPostComment,
  };
};