import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  Divider,
  Text,
  useToast,
  Badge,
  Flex,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { FaRegClock, FaEye, FaRegCalendarAlt } from "react-icons/fa";
import { CommentSection } from "./CommentSection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostActions } from "./BlogPostActions";
import { BlogPostMeta } from "./BlogPostMeta";
import FullScreenImageModal from './fullScreenImage/FullScreenImageModal';

export const BlogPostCard = ({ post }) => {
  const { isOpen: isCommentsOpen, onToggle: onToggleComments } =
    useDisclosure();
  const [comments, setComments] = useState(post?.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState([]);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);

  const toast = useToast();

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    setComments(post?.comments || []);
  }, [post?.comments]);

  const handleImageClick = () => {
    setIsFullScreenOpen(true)
  };

  const handleCloseFullScreen = () => {
    setIsFullScreenOpen(false)
  }

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

  // Datos de ejemplo para mejorar la interfaz
  const readingTime = Math.ceil((post?.description?.length || 0) / 800); // ~200 palabras por minuto
  const views = Math.floor(Math.random() * 100) + 10; // Para ejemplo
  const createdDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Fecha no disponible";

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg" // Sombra más pronunciada
      mb={6}
      bg="white"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "translateY(-5px)",
        boxShadow: "xl"
      }}
    >
      <Box position="relative">
        <Box onClick={handleImageClick} cursor="pointer">
          <BlogPostHeader
            imageUrl={post.img}
            title={post?.title}
            link={`/posts/${post?._id}`}
          />
        </Box>


      </Box>

      <Box p={6}>
        <BlogPostMeta
          authorName={post?.user}
          date={createdDate}
          category={post?.category}
        />

        {/* Metaindicadores adicionales */}
        <Flex wrap="wrap" gap={3} mb={4}>
          <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="cyan">
            <TagLeftIcon boxSize="12px" as={FaRegClock} />
            <TagLabel>{readingTime} min lectura</TagLabel>
          </Tag>

          <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="orange">
            <TagLeftIcon boxSize="12px" as={FaRegCalendarAlt} />
            <TagLabel>{createdDate}</TagLabel>
          </Tag>
        </Flex>

        <Box bg="gray.50" p={4} borderRadius="md" mb={4}>
          <Text color="gray.700" noOfLines={4}>
            {post?.description}
          </Text>
        </Box>

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
            comments={sortedComments}
            setComments={setComments}
            showAllComments={showAllComments}
            setShowAllComments={setShowAllComments}
            onLikeComment={handleLikeComment}
            likedComments={likedComments}
            currentUserId={""}
          />
        </Collapse>
      </Box>

      {isFullScreenOpen && (
        <FullScreenImageModal
          imageUrl={post.img}
          title={post?.title}
          description={post?.description}
          onClose={handleCloseFullScreen}
        />
      )}
    </Box>
  );
};