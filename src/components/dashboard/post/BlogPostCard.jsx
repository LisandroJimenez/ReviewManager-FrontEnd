import React, { useState, useEffect } from "react";
import { Box, Collapse, Divider, Text, useToast } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { CommentSection } from "./CommentSection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostActions } from "./BlogPostActions";
import { BlogPostMeta } from "./BlogPostMeta";

export const BlogPostCard = ({ post }) => {
  const { isOpen: isCommentsOpen, onToggle: onToggleComments } =
    useDisclosure();
  const [comments, setComments] = useState(post?.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState([]);

  const toast = useToast();

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post?.comments]);

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
        imageUrl={post.img}
        title={post?.title}
        link={`/posts/${post?._id}`}
      />
      <Box p={6}>
        <BlogPostMeta
          authorName={post?.user}
          date={
            post?.createdAt
              ? new Date(post.createdAt).toLocaleDateString()
              : "Fecha no disponible"
          }
        />
        <Text color="gray.700" noOfLines={4} mb={5}>
          {post?.description}
        </Text>
        <BlogPostActions
          isLiked={isLiked}
          isSaved={isSaved}
          onToggleComments={onToggleComments}
          commentCount={comments.length}
          onLike={handleLikePost}
          onSave={handleSavePost}
        />
        <Collapse in={isCommentsOpen} animateOpacity>
          <Divider my={4} />
          <CommentSection
            postId={post?._id}
            comments={comments}
            setComments={setComments}
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
