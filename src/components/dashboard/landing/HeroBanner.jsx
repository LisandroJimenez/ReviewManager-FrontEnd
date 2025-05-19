import React from "react";
import { Box, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const HeroBanner = ({ selectedCategory, categories }) => {
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, blue.500)",
    "linear(to-r, teal.300, blue.300)"
  );

  const getHeroText = () => {
    if (!selectedCategory) {
      return {
        title: "Bienvenido a Speakly. Explora Nuestro Blog",
        subtitle: "Descubre contenido fascinante y mantente al día con las últimas publicaciones"
      };
    }

    const foundCategory = categories.find(cat => cat._id === selectedCategory);
    const categoryName = foundCategory ? foundCategory.name : selectedCategory; 

    const categoryTexts = {
      default: {
        title: `Explorando ${categoryName}`,
        subtitle: "Contenido seleccionado especialmente para ti"
      }
    };

    if (foundCategory) {
      return {
        title: `Explorando ${foundCategory.name}`,
        subtitle: "Contenido seleccionado especialmente para ti"
      };
    } else {
      return categoryTexts.default;
    }
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

export default HeroBanner;