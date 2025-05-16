import React, { useState, useEffect } from "react";
import { Box, Text, Heading, Flex, Badge, Container, Icon, Grid, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import BlogNavbar from "../components/dashboard/common/Navbar/Navbar";
import { BlogPostCard } from "../components/dashboard/post/BlogPostCard";
import { usePost } from "../shared/hooks/usePost";
import { TrendingUp, Book, Star, Clock } from "lucide-react";

// Componente para el banner destacado
const HeroBanner = ({ selectedCategory }) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, blue.500)",
    "linear(to-r, teal.300, blue.300)"
  );

  const getHeroText = () => {
    if (!selectedCategory) {
      return {
        title: "Explora Nuestro Blog",
        subtitle: "Descubre contenido fascinante y mantente al día con las últimas publicaciones"
      };
    }

    // Textos personalizados según la categoría
    const categoryTexts = {
      tecnologia: {
        title: "Novedades en Tecnología",
        subtitle: "Las últimas tendencias y avances del mundo tech"
      },
      salud: {
        title: "Bienestar y Salud",
        subtitle: "Consejos y artículos para una vida saludable"
      },
      deportes: {
        title: "El Mundo del Deporte",
        subtitle: "Noticias, análisis y eventos deportivos destacados"
      },
      viajes: {
        title: "Destinos Fascinantes",
        subtitle: "Inspiración para tu próxima aventura"
      },
      // Añade más categorías según necesites
      default: {
        title: `Explorando ${selectedCategory}`,
        subtitle: "Contenido seleccionado especialmente para ti"
      }
    };

    return categoryTexts[selectedCategory] || categoryTexts.default;
  };

  const heroText = getHeroText();

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      py={16}
      px={8}
      bgGradient={bgGradient}
      color="white"
      borderRadius="lg"
      textAlign="center"
      mb={18}
      w="100%"
      maxW="1000px"
      boxShadow="xl"
    >
      <Heading
        as={motion.h1}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mb={4}
      >
        {heroText.title}
      </Heading>
      <Text
        as={motion.p}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        fontSize={{ base: "md", md: "xl" }}
        maxW="700px"
        mx="auto"
      >
        {heroText.subtitle}
      </Text>
    </Box>
  );
};

const StatsSection = ({ postsCount }) => {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      w="100%"
      maxW="1000px"
      mb={8}
    >
      <StatBox
        icon={<TrendingUp />}
        label="Publicaciones"
        value={postsCount}
      />

      <StatBox
        icon={<Clock />}
        label="Tiempo Promedio"
        value="5 min"
      />
    </Grid>
  );
};

const StatBox = ({ icon, label, value }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="lg"
      boxShadow="md"
      textAlign="center"
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
    >
      <Flex justify="center" mb={2}>
        <Icon as={() => icon} color="teal.500" boxSize={8} />
      </Flex>
      <Text fontWeight="bold" fontSize="xl">{value}</Text>
      <Text color="gray.500" fontSize="sm">{label}</Text>
    </Box>
  );
};

// Componente para la sección de categorías destacadas


// Componente principal
const LandingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { posts, isFetching, getPosts } = usePost(selectedCategory);

  useEffect(() => {
    getPosts();
  }, [selectedCategory]); // Cada vez que cambia la categoría, recarga posts

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <BlogNavbar onSelectCategory={handleCategorySelect} />

      <Container maxW="container.xl" py={8}>
        <Flex direction="column" align="center">
          <HeroBanner selectedCategory={selectedCategory} />

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
                    {selectedCategory ? `Publicaciones de ${selectedCategory}` : "Publicaciones recientes"}
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
                  <Text fontSize="xl">No hay publicaciones en esta categoría.</Text>
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