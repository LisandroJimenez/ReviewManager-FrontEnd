import React, { useState } from "react";
import { Box, Collapse, Divider, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CommentSection } from "./CommentSection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostActions } from "./BlogPostActions";
import { BlogPostMeta } from "./BlogPostMeta";

export const BlogPostCard = ({ post }) => {
  const { isOpen: isCommentsOpen, onToggle: onToggleComments } = useDisclosure();
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState([]);

  const mappedComments = post?.comments?.map((comment) => ({
    id: comment._id || `comment-${Date.now()}-${Math.random()}`,
    text: comment.description,
    author: {
      name: comment.user?.username || "Anónimo",
      image: "https://via.placeholder.com/50",
    },
    createdAt: comment.createdAt,
    likes: 0,
  })) || [];

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
    console.log("Nuevo comentario:", newComment);
    setCommentText("");
  };

  const handleLikePost = () => {
    setIsLiked(!isLiked);
    console.log("Me gusta:", !isLiked, post?._id);
  };

  const handleSavePost = () => {
    setIsSaved(!isSaved);
    console.log("Guardar:", !isSaved, post?._id);
  };

  const handleLikeComment = (commentId) => {
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter((id) => id !== commentId));
      console.log("Quitar me gusta del comentario:", commentId);
    } else {
      setLikedComments([...likedComments, commentId]);
      console.log("Me gusta del comentario:", commentId);
    }
  };

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      mb={6}
      bg="white"
    >
      <BlogPostHeader
        imageUrl="https://via.placeholder.com/800x400"
        title={post?.title}
        link={`/posts/${post?._id}`}
      />
      <Box p={6}>
        <BlogPostMeta
          authorName={post?.user}
          authorImage="https://via.placeholder.com/50"
          date={post?.createdAt ? new Date(post.createdAt).toLocaleDateString() : "Fecha no disponible"}
        />
        <Text color="gray.700" noOfLines={4} mb={5}>
          {post?.description}
        </Text>
        <BlogPostActions
          isLiked={isLiked}
          isSaved={isSaved}
          onToggleComments={onToggleComments}
          commentCount={mappedComments.length}
          onLike={handleLikePost}
          onSave={handleSavePost}
        />
        <Collapse in={isCommentsOpen} animateOpacity>
          <Divider my={4} />
          <CommentSection
            comments={mappedComments}
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