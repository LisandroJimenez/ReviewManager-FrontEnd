import React from "react";
import { Text, Icon, HStack, useColorModeValue } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";
import { Link } from "@chakra-ui/react";

export default function Logo() {
  const logoColor = useColorModeValue("teal.600", "teal.200");
  
  return (
    <HStack spacing={2}>
      <Icon 
        as={MessageSquare} 
        color={logoColor} 
        boxSize={6} 
        strokeWidth={2.5}
      />
    <Link href="/" textDecoration="none"   _hover={{ textDecoration: "none" }}>
      <Text
        fontFamily="heading"
        
        color={logoColor}
        fontWeight="extrabold"
        fontSize="xl"
        letterSpacing="tight"
      >
        Speakly
      </Text>
    </Link>
    </HStack>
  );
}