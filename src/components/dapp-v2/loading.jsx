import React from "react";
import { VStack, Text, Spinner, Image } from "@chakra-ui/react";

export const Loading = () => {
    return(
        <VStack>
            <Image src="https://i.ibb.co/7CC8Q5j/vela-azul.gif" alt='vela' boxSize='50px' />
            {/* <Spinner color="white" /> */}
            <Text zIndex={30} color='white' id='loading' />
        </VStack>
    )
};