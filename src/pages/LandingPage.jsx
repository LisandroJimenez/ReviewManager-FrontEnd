import React, { useState, useEffect } from "react";
import {
  Box, Text, Heading, Flex, Container, Grid,
  useColorModeValue, Button, useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import BlogNavbar from "../components/dashboard/common/Navbar/Navbar";
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";
import { usePost } from "../shared/hooks/usePost";
import HeroBanner from "../components/dashboard/landing/HeroBanner";
import StatsSection from "../components/dashboard/landing/StatsSections";
import { useCategories } from "../shared/hooks/useCategories";
import CreatePostModal from "../components/PostModal/CreatePostModal";

const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [appliedSearch, setAppliedSearch] = useState("");

  const { categories } = useCategories();
  const categoryName = categories.find(cat => cat._id === selectedCategory)?.name || selectedCategory;

  const { posts, isFetching, getPosts } = usePost(selectedCategory, appliedSearch);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getPosts();
  }, [selectedCategory, appliedSearch]);

  const handleCategorySelect = (category) => setSelectedCategory(category);
  const handleSearch = (searchTerm) => setAppliedSearch(searchTerm.trim());
  const handlePostCreated = (newPost) => getPosts();

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const btnColor    = useColorModeValue("gray.700", "gray.200");
  const btnHoverBg  = useColorModeValue("gray.100", "gray.700");
  const btnHoverBorder = useColorModeValue("gray.400", "gray.500");

  return (
    // overflowX="hidden" en el contenedor raíz evita que cualquier
    // hijo desborde horizontalmente en móvil
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")} overflowX="hidden">
      <BlogNavbar
        onSelectCategory={handleCategorySelect}
        onSearch={handleSearch}
      />

      {/* px responsivo para que el contenido respete los márgenes en móvil */}
      <Container maxW="container.xl" py={8} px={{ base: 4, md: 6, lg: 8 }}>
        <Flex direction="column" align="center">
          <HeroBanner selectedCategory={selectedCategory} categories={categories} />

          {!isFetching && <StatsSection postsCount={posts.length} />}

          <Flex w="100%" justify="flex-end" mb={4} mt={2}>
            <Button
              onClick={onOpen}
              size="sm"
              variant="outline"
              borderColor={borderColor}
              color={btnColor}
              fontWeight="500"
              borderRadius="md"
              _hover={{
                bg: btnHoverBg,
                borderColor: btnHoverBorder,
              }}
            >
              + Nuevo post
            </Button>
          </Flex>

          {isFetching ? (
            <Box p={10} textAlign="center" w="100%">
              <Text fontSize="xl">Cargando publicaciones...</Text>
            </Box>
          ) : (
            <>
              {posts.length > 0 ? (
                // w="100%" + minW={0} en section y grid previenen que
                // el contenido empuje el layout más allá del viewport
                <Box as="section" w="100%" minW={0}>
                  <Heading size="lg" mb={6} textAlign="center">
                    {selectedCategory
                      ? `Publicaciones de ${categoryName}`
                      : appliedSearch
                        ? `Resultados de búsqueda para "${appliedSearch}"`
                        : "Publicaciones recientes"}
                  </Heading>

                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                    gap={6}
                    w="100%"
                    minW={0}
                  >
                    {posts.map((post) => (
                      // minW={0} en cada celda es clave: sin esto,
                      // los items de grid no se comprimen por debajo
                      // de su contenido mínimo, causando overflow
                      <Box
                        as={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        key={post._id}
                        minW={0}
                        w="100%"
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

      <CreatePostModal
        isOpen={isOpen}
        onClose={onClose}
        categories={categories}
        onPostCreated={handlePostCreated}
      />
    </Box>
  );
};

export default LandingPage;