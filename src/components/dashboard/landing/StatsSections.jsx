import React from "react";
import { Grid  } from "@chakra-ui/react";
import { TrendingUp, Clock, Blocks, Star } from "lucide-react";
import StatBox from "./StatBox";

const StatsSection = ({ postsCount }) => {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      justifyContent="center"
      gap={9}
      w="100%"
      maxW="1000px"
      mb={9}
    >
      <StatBox icon={<TrendingUp />} label="Publicaciones" value={postsCount} />
      <StatBox icon={<Clock />} label="Tiempo Promedio" value="5 min" />
      <StatBox icon={<Blocks />} label="Categorías" value="6" />
      <StatBox icon={<Star   />} label="Valoración Media" value="4.9" />  
    </Grid>
  );
};

export default StatsSection;
