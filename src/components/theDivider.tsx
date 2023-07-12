import { HStack, VStack, useColorModeValue } from "@chakra-ui/react";

export interface TheDividerProps {
    h: boolean
}

export const TheDivider = ({h}: TheDividerProps) => {
    const bg = useColorModeValue('blue.300', 'blue.400');
    return (
        h ? <HStack w='full' h='5px' bg={bg}/> : <VStack h='450px' w='10px' bg={bg} />
    );
}