import React from "react";
import BlogNavbar from "../components/dashboard/common/Navbar/Navbar";
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";
import { Box, Text } from "@chakra-ui/react";
import { usePost } from "../shared/hooks/usePost"; // Ajusta la ruta a tu hook

const LandingPage = () => {
  const { posts, isFetching, getPosts } = usePost();

  if (isFetching) {
    return (
      <>
        <BlogNavbar />
        <Box p={10} textAlign="center">
          <Text fontSize="xl">Cargando publicaciones...</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <BlogNavbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        p={10}
      >
        {posts.map((post) => (
          <Box key={post._id} w="100%" maxW="700px" mb={4}>
            <BlogPostCard post={post} />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LandingPage;