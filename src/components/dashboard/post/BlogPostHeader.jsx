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
        bgGradient="linear(to-t, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)"
        p={4}
      >
        <Link href={link} textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Heading
            color="white"
            fontSize="xl"
            fontFamily="body"
            _hover={{ color: "teal.300" }}
          >
            {title}
          </Heading>
        </Link>
      </Box>
    </Box>
  );
};