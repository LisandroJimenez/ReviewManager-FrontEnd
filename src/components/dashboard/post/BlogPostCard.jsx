import React from "react";
import { Box, Collapse, Divider, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CommentSection } from "./CommentSection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostActions } from "./BlogPostActions";
import { BlogPostMeta } from "./BlogPostMeta";

export const BlogPostCard = () => {
  const { isOpen: isCommentsOpen, onToggle: onToggleComments } = useDisclosure();
  const [commentText, setCommentText] = React.useState(""); // Usamos React.useState aquí
  const [showAllComments, setShowAllComments] = React.useState(false); // Usamos React.useState aquí
  const [isLiked, setIsLiked] = React.useState(false); // Usamos React.useState aquí
  const [isSaved, setIsSaved] = React.useState(false); // Usamos React.useState aquí
  const [likedComments, setLikedComments] = React.useState([]); // Usamos React.useState aquí
  const [comments, setComments] = React.useState([ // Datos de ejemplo de comentarios
    {
      id: "comentario-1",
      text: "¡Excelente artículo de ejemplo! Muy bien explicado.",
      author: { name: "Usuario Ejemplo 1", image: "https://via.placeholder.com/50" },
      createdAt: new Date(Date.now() - 86400000).toISOString(), // Ayer
      likes: 2,
    },
    {
      id: "comentario-2",
      text: "¿Dónde puedo encontrar más posts de ejemplo como este?",
      author: { name: "Usuario Ejemplo 2", image: "https://via.placeholder.com/50" },
      createdAt: new Date().toISOString(), // Hoy
      likes: 0,
    },
  ]);

  const samplePost = { // Datos de ejemplo del post
    imageUrl: "https://via.placeholder.com/800x400",
    title: "Título de Ejemplo del Post",
    link: "/ejemplo-post",
    author: "Autor Ejemplo",
    authorImage: "https://via.placeholder.com/50",
    date: "Mayo 11, 2025",
    excerpt: "Este es un breve extracto del contenido del post de ejemplo para mostrar cómo se vería en la tarjeta.",
  };

  const handleAddComment = () => {
    if (commentText.trim() === "") return;
    const newComment = {
      id: `comment-${Date.now()}`,
      text: commentText,
      author: {
        name: "Usuario Actual",
        image: "https://avatars.dicebear.com/api/human/current-user.svg",
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
  };

  const handleLikeComment = (commentId) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, likes: (c.likes || 1) - 1 } : c
      );
      setComments(updatedComments);
    } else {
      setLikedComments([...likedComments, commentId]);
      const updatedComments = comments.map((c) =>
        c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
      );
      setComments(updatedComments);
    }
  };

  return (
    
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      mb={6}
      bg="white"
    >
      {/* Encabezado del post */}
      <BlogPostHeader
        imageUrl={samplePost.imageUrl}
        title={samplePost.title}
        link={samplePost.link}
      />

      {/* Cuerpo del post */}
      <Box p={6}>
        <BlogPostMeta
          authorName={samplePost.author}
          authorImage={samplePost.authorImage}
          date={samplePost.date}
        />
        <Text color="gray.700" noOfLines={4} mb={5}>
          {samplePost.excerpt}
        </Text>

        {/* Acciones */}
        <BlogPostActions
          isLiked={isLiked}
          isSaved={isSaved}
          onToggleComments={onToggleComments}
          commentCount={comments.length}
          onLike={handleLikePost}
          onSave={handleSavePost}
        />

        {/* Sección de comentarios */}
        <Collapse in={isCommentsOpen} animateOpacity>
          <Divider my={4} />
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            commentText={commentText}
            setCommentText={setCommentText}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
            onLikeComment={handleLikeComment}
            likedComments={likedComments}
          />
        </Collapse>
      </Box>
    </Box>
  );
};