import React from "react";
import { HStack, Text, VStack, Box, Heading, Grid } from "@chakra-ui/react";
import { Data } from "../../components/admin/data";

export const StadisticData = ({ data, title }) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <Heading color="white">{title}</Heading>
      <Box h="10px" />
      <Grid w='90%' templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((d, idx) => (
          <Data key={idx} title={d.title} value={d.value} />
        ))}
      </Grid>
    </VStack>
  );
};
