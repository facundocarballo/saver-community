import { VStack, Box, Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const RoadMap = () => {
    const roadMapImage = useColorModeValue('https://i.ibb.co/swFGJPC/saver-community-road-map.png', 'https://i.ibb.co/QQ4YwNc/Captura-de-Pantalla-2022-06-11-a-la-s-19-49-22.png');
    return (
        <VStack w='full'>
            <Box h="100px"/>

            <Image 
            src={roadMapImage}
            alt='Saver Token Icon'
            width='500px'
            />
            
            <Box h="100px" />
        </VStack>
    );
};