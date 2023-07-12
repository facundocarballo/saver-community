import React from "react";
import { HStack, VStack, Spacer, Box, Text, Image } from "@chakra-ui/react";
import { Triangle } from "../../components/dapp-v2/triangle";
import { InfoAlerts } from "../../components/dapp-v2/infoAlerts";
import { SaverChart } from "../../components/dapp-v2/saverChart";


export const Info = () => 
{
    // Attributes

    // Context

    // Methods

    // Component
    return(
        <>
            {/* Desktop */}
            <HStack
            display={{lg:"flex", md: "none", sm: "none", base: "none"}}
            w='full'
            >
                <Spacer />
                
                <InfoAlerts />

                <Spacer />
                
                <Triangle />

                <Spacer />

                <SaverChart />

                <Spacer />

            </HStack>

            {/* Mobile */}
            <VStack
            display={{lg:"none", md: "flex", sm: "flex", base: "flex"}}
            >
            
                <InfoAlerts />

                <Box h='50px' />

                <Triangle />

                <Box h='50px' />

                <SaverChart />

                <Box h='50px' />

            </VStack>

        </>
    );
}