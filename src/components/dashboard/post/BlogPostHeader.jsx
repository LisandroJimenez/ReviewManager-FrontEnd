import React from "react";
import { Box, Image, Heading, Link } from "@chakra-ui/react";

export const BlogPostHeader = ({ imageUrl, title, link }) => {
  return (
    <Box position="relative" height="240px" mb={6} borderRadius="md" overflow="hidden">
      <Image
        src={imageUrl}
        alt=""
        objectFit="cover"
        w="100%"
        h="100%"
      />
      <Box
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        bg="rgba(0, 0, 0, 0.5)" 
        p={4}
      >
        
          <Heading
            color="white"
            fontSize="xl"
            fontFamily="body"
          >
            {title}
          </Heading>

      </Box>
    </Box>
  );
};