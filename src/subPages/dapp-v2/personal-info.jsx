import React from "react";
import { VStack, HStack, Spacer, Box, Image, Text } from "@chakra-ui/react";
import { Purpose } from "../../components/dapp-v2/purpose";
import { Requirements } from "../../components/dapp-v2/requirements";

export const PersonalInfo = () =>
{
    // Attributes

    // Context

    // Methods

    // Component
    return(
        <>
            {/* Desktop */}
            <HStack
            w='full'
            display={{lg: 'flex', md: 'none', sm: 'none', base: 'none'}}
            >
                <Spacer />
                <Purpose isPersonalPurpose={false} />
                <Spacer />
                <Requirements />
                <Spacer />
                <Purpose isPersonalPurpose={true} />
                <Spacer />
            </HStack>


            {/* Mobile */}
            <VStack
            w='full'
            display={{lg: 'none', md: 'flex', sm: 'flex', base: 'flex'}}
            >
                <Requirements />
                <Box h='50px' />
                <Purpose isPersonalPurpose={false} />
                <Box h='50px' />
                <Purpose isPersonalPurpose={true} />
                <Box h='50px' />
            </VStack>
        </>
    )
}