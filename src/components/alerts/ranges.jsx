import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    VStack,
    HStack,
    Text,
    Button,
    Box,
    Spacer,
    
} from '@chakra-ui/react'
import { useProvider } from '../../context';

export const AlertRanges = (props) => {
    const { rangesIsOpen, rangesCancelRef, rangesOnClose } = useProvider();
    return(
        <AlertDialog 
            isOpen={rangesIsOpen}
            leastDestructiveRef={rangesCancelRef}
            onClose={rangesOnClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>Requisitos para pertenecer a un rango</AlertDialogHeader>

                        <AlertDialogBody>
                            <VStack w='full' h='full'>
                                <HStack w='full'>
                                    <Text>Actualmente tu estas en el Rango {props.actualRange}</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- {props.saverAmount} SAVER</Text>
                                    <Spacer />
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- {props.donateBalance} USDC en el Balance de Donaciones</Text>
                                    <Spacer />
                                </HStack>
                                <Box h='15px' />
                                <HStack w='full'>
                                    <Text>Rango 1:</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- Tener entre 10 y 100 SAVER</Text>
                                    <Spacer />
                                </HStack>
                                <HStack>
                                    <Box w='15px' />
                                    <Text>- Tener entre 10 y 100 USDC en el Balance de donaciones</Text>
                                    <Spacer />
                                </HStack>
                                <HStack w='full'>
                                    <Text>Rango 2:</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- Tener entre 100 y 1000 SAVER</Text>
                                    <Spacer />
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- Tener entre 100 y 1000 USDC en el Balance de donaciones</Text>
                                    <Spacer />
                                </HStack>
                                <HStack w='full'>
                                    <Text>Rango 3:</Text>
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- Tener entre 1000 y 10000 SAVER</Text>
                                    <Spacer />
                                </HStack>
                                <HStack w='full'>
                                    <Box w='15px' />
                                    <Text>- Tener entre 1000 y 10000 USDC en el Balance de donaciones</Text>
                                    <Spacer />
                                </HStack>
                            </VStack>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                        <Button ref={rangesCancelRef} onClick={rangesOnClose} variant='callToAction'>
                            OK
                        </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
    );
};