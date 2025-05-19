import React from "react";
import { 
  Avatar, 
  Stack, 
  Text, 
  HStack, 
  Box, 
  Flex, 
  Icon, 
  Tooltip
} from "@chakra-ui/react";
import { FaRegStar, FaShieldAlt, FaCheck } from "react-icons/fa";

export const BlogPostMeta = ({ authorImage, date, category }) => {
  return (
    <Flex 
      justifyContent="space-between" 
      alignItems="center" 
      mb={4} 
      flexWrap="wrap"
      gap={2}
    >
      <HStack spacing={3}>
        <Avatar 
          src={authorImage} 
          size="md" 
          border="2px solid"
          borderColor="teal.400"
        />
        <Stack direction="column" spacing={0}>

          <HStack spacing={1} fontSize="xs" color="gray.500">
            <Text>Usuario Anónimo</Text>
          </HStack>
        </Stack>
      </HStack>
      
      {category && (
        <Box
          px={3}
          py={1}
          bg="teal.50"
          borderRadius="full"
          fontSize="sm"
          fontWeight="semibold"
          color="teal.700"
          borderWidth="1px"
          borderColor="teal.200"
          _hover={{ bg: "teal.100" }}
          cursor="pointer"
          transition="all 0.2s"
        >
          {category}
        </Box>
      )}
    </Flex>
  );
};