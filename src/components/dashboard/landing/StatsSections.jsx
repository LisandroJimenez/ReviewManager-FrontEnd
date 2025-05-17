import React from "react";
import { Grid } from "@chakra-ui/react";
import { TrendingUp, Clock } from "lucide-react";
import StatBox from "./StatBox";

const StatsSection = ({ postsCount }) => {
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }}
      gap={4}
      w="100%"
      maxW="1000px"
      mb={8}
    >
      <StatBox icon={<TrendingUp />} label="Publicaciones" value={postsCount} />
      <StatBox icon={<Clock />} label="Tiempo Promedio" value="5 min" />
    </Grid>
  );
};

export default StatsSection;
