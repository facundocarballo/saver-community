import React from "react";
import { Image, HStack, Spacer, Box } from "@chakra-ui/react";

export const ImageQualified = ({condition}) => {
    const checkImage = "https://i.ibb.co/0JT3GVz/check.png";
    const stopImage = "https://i.ibb.co/893fFzv/stop.png";

    return (
        <HStack w='full'>
            <Spacer />
            <Image
            alt='imgQualified'
            src={condition ? checkImage : stopImage}
            boxSize='20px'
            />
            <Box w='5px' />
            <Spacer />
        </HStack>
    )
}