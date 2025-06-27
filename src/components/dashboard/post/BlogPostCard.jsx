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
import { useColorModeValue } from "@chakra-ui/react";
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

  // Theme colors
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'gray.300');
  const descriptionBg = useColorModeValue('gray.50', 'gray.700');
  const descriptionColor = useColorModeValue('gray.700', 'gray.200');
  const shadowColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)');
  const hoverShadow = useColorModeValue('rgba(0,0,0,0.15)', 'rgba(0,0,0,0.4)');

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

  const createdDate = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : "Fecha no disponible";

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      boxShadow={`0 4px 12px ${shadowColor}`}
      mb={6}
      bg={cardBg}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: `0 8px 25px ${hoverShadow}`,
        borderColor: useColorModeValue('gray.300', 'gray.500')
      }}
      position="relative"
    >
      {/* Gradient overlay for modern look */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        height="4px"
        bgGradient={useColorModeValue(
          'linear(to-r, blue.400, purple.500, pink.500)',
          'linear(to-r, blue.300, purple.400, pink.400)'
        )}
        borderTopRadius="xl"
      />

      <Box position="relative" mt={1}>
        <Box 
          onClick={handleImageClick} 
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            transform: "scale(1.02)"
          }}
          overflow="hidden"
          borderRadius="lg"
          mx={4}
          mt={4}
        >
          <BlogPostHeader
            imageUrl={post.img}
            title={post?.title}
            link={`/posts/${post?._id}`}
          />
        </Box>
      </Box>

      <Box p={6}>
        <BlogPostMeta
          authorName={post?.user || "Usuario Anónimo"}
          date={createdDate}
          category={post?.category}
        />

        <Flex wrap="wrap" gap={3} mb={4}>
          <Tag 
            size="sm" 
            borderRadius="full" 
            variant="subtle" 
            colorScheme="orange"
            bg={useColorModeValue('orange.50', 'orange.900')}
            color={useColorModeValue('orange.600', 'orange.200')}
            _hover={{
              transform: 'scale(1.05)',
              bg: useColorModeValue('orange.100', 'orange.800')
            }}
            transition="all 0.2s ease"
          >
            <TagLeftIcon boxSize="12px" as={FaRegCalendarAlt} />
            <TagLabel>{createdDate}</TagLabel>
          </Tag>
        </Flex>

        <Box 
          bg={descriptionBg} 
          p={5} 
          borderRadius="xl" 
          mb={4}
          border="1px solid"
          borderColor={useColorModeValue('gray.100', 'gray.600')}
          transition="all 0.3s ease"
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.650'),
            borderColor: useColorModeValue('gray.200', 'gray.500')
          }}
        >
          <Text 
            color={descriptionColor} 
            noOfLines={4}
            lineHeight="1.6"
            fontSize="sm"
          >
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
          <Divider 
            my={4} 
            borderColor={useColorModeValue('gray.200', 'gray.600')}
          />
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