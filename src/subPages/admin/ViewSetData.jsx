import { Grid, Heading, VStack, Box } from "@chakra-ui/react";
import React from "react";
import { SetData } from "../../components/admin/SetData";

export const ViewSetData = ({ data, title }) => {
  // Attributes
  // Context
  // Methods
  // Component
  return (
    <VStack w="full">
      <Box h="10px" />
      <Heading color="white">{title}</Heading>
      <Box h="10px" />
      <Grid w="90%" templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((d, idx) => (
          <SetData
            key={idx}
            title={d.title}
            actual_value={d.actual_value}
            func={d.func}
            have_params={d.params}
          />
        ))}
      </Grid>
    </VStack>
  );
};
