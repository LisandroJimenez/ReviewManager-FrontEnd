import React from "react";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";

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

export default StatBox;
