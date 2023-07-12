import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { HStack, Button, Spacer, VStack, Box, useColorMode } from '@chakra-ui/react';

export const NavBar = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return(
        <HStack w='full' h='20px' >
            <Spacer />
            <Button onClick={toggleColorMode} variant='header'>
                {
                    colorMode === 'dark' ? <SunIcon /> : <MoonIcon />
                }
            </Button>
            <Box w='10px'/>
        </HStack>
    )
};