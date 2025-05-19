export const validateCommentInput = ({ user, description }) => {
  const errors = {};

  if (user.length > 50) {
    errors.user = "El nombre es demasiado largo (máx. 50 caracteres).";
  }

  if (!description || !description.trim()) {
    errors.description = "El comentario no puede estar vacío.";
  } else if (description.length > 500) {
    errors.description = "El comentario es muy largo (máx. 500 caracteres).";
  }

  return errors;
};
