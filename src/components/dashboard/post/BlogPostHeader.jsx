import React from "react";
import { Box, Image, Heading, Link, Flex, Icon } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";

export const BlogPostHeader = ({ imageUrl, title, link, featured = false }) => {
  return (
    <Box position="relative" height="280px" mb={3} borderRadius="md" overflow="hidden">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(to-b, transparent 40%, rgba(0,0,0,0.8))"
        zIndex="1"
      />
      
      <Image
        src={imageUrl}
        alt={title}
        objectFit="cover"
        w="100%"
        h="100%"
        transition="transform 0.5s ease"
        _hover={{ transform: "scale(1.05)" }}
      />
      
      {featured && (
        <Flex 
          position="absolute"
          top="0"
          right="0"
          bg="teal.500"
          color="white"
          p={2}
          zIndex="2"
          borderBottomLeftRadius="md"
        >
          <Icon as={FaBookmark} />
        </Flex>
      )}
      
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        p={5}
        zIndex="2"
      >
        <Heading
          color="white"
          fontSize="xl"
          fontWeight="bold"
          textShadow="1px 1px 3px rgba(0,0,0,0.6)"
        >
          {title}
        </Heading>
      </Box>
    </Box>
  );
};