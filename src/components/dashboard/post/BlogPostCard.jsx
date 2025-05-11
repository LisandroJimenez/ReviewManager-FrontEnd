import React, { useState } from "react";
import { Box, Collapse, Button, Divider, Text, HStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CommentSection } from "./CommentSection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostActions } from "./BlogPostActions";
import { BlogPostMeta } from "./BlogPostMeta";

export const BlogPostCard = ({ post }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);

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
    };

    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <Box
      maxW="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      mb={6}
    >
      {/* Encabezado del post */}
      <BlogPostHeader post={post} />

      {/* Cuerpo del post */}
      <Box p={6}>
        <Text color="gray.500" noOfLines={3} mb={4}>
          {/* Resumen del post */}
        </Text>

        <BlogPostMeta post={post} />

        {/* Acciones */}
        <BlogPostActions 
          isLiked={false} 
          isSaved={false} 
          onToggle={onToggle} 
          commentCount={comments.length} 
        />

        {/* Sección de comentarios */}
        <Collapse in={isOpen} animateOpacity>
          <Divider mb={4} />
          <CommentSection
            comments={comments}
            onAddComment={handleAddComment}
            commentText={commentText}
            setCommentText={setCommentText}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
          />
        </Collapse>
      </Box>
    </Box>
  );
};
