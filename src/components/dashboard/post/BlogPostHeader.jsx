import React from "react";
import { Box, Image, Heading, Link } from "@chakra-ui/react";

export const BlogPostHeader = ({ post }) => {
  return (
    <Box position="relative" height="220px" mb={6}>
      <Image
        src={post} // Imagen destacada
        alt="" // Alt text
        objectFit="cover"
        w="100%"
        h="100%"
        borderRadius="md"
      />
      <Link href={""} textDecoration="none" _hover={{ textDecoration: "none" }}>
        <Heading
          color="gray.700"
          fontSize="2xl"
          fontFamily="body"
          mb={2}
          _hover={{ color: "teal.500" }}
        >
          {/* Título del post */}
        </Heading>
      </Link>
    </Box>
  );
};
