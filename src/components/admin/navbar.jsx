import React from "react";
import { HStack, Box, Button } from "@chakra-ui/react";
import NextLink from 'next/link'
import { ArrowBackIcon } from "@chakra-ui/icons";


export const NavBar = () => {
  // Attributes
  // Context
  // Methods
  // Component
  return(
    <HStack w='full'>
        <Box w='20px' />
        <NextLink href="/admin">
            <Button>
                <ArrowBackIcon />
            </Button>
        </NextLink>
    </HStack>
  );
};
