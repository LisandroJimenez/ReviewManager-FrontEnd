import React, { useState, useEffect } from "react";
import {
  Box, Text, Heading, Flex, Container, Grid, useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import BlogNavbar from "../components/dashboard/common/Navbar/Navbar";
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";
import { usePost } from "../shared/hooks/usePost";
import HeroBanner from "../components/dashboard/landing/HeroBanner";
import StatsSection from "../components/dashboard/landing/StatsSections";
import { useCategories } from "../shared/hooks/useCategories";  // <-- importás el hook

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [appliedSearch, setAppliedSearch] = useState("");

  // Usás el hook que carga categorías automáticamente
  const { categories } = useCategories();
  const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || selectedCategory;

  const { posts, isFetching, getPosts } = usePost(selectedCategory, appliedSearch);

  // Obtener posts cuando cambia la categoría o la búsqueda
  useEffect(() => {
    getPosts();
  }, [selectedCategory, appliedSearch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (searchTerm) => {
    setAppliedSearch(searchTerm.trim());
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <BlogNavbar
        onSelectCategory={handleCategorySelect}
        onSearch={handleSearch}
      />
      <Container maxW="container.xl" py={8}>
        <Flex direction="column" align="center">
          <HeroBanner selectedCategory={selectedCategory} categories={categories} />
          {!isFetching && <StatsSection postsCount={posts.length} />}
          {isFetching ? (
            <Box p={10} textAlign="center" w="100%">
              <Text fontSize="xl">Cargando publicaciones...</Text>
            </Box>
          ) : (
            <>
              {posts.length > 0 ? (
                <Box as="section" w="100%">
                  <Heading size="lg" mb={6} textAlign="center">
                    {selectedCategory
                      ? `Publicaciones de ${categoryName}`
                      : appliedSearch
                        ? `Resultados de búsqueda para "${appliedSearch}"`
                        : "Publicaciones recientes"}
                  </Heading>
                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
                    gap={6}
                  >
                    {posts.map((post) => (
                      <Box
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        key={post._id}
                      >
                        <BlogPostCard post={post} />
                      </Box>
                    ))}
                  </Grid>
                </Box>
              ) : (
                <Box p={10} textAlign="center" w="100%">
                  <Text fontSize="xl">No hay publicaciones encontradas.</Text>
                </Box>
              )}
            </>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default LandingPage;
