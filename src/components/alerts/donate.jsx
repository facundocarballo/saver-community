import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    VStack,
    Text,
    Button,
    Box,
    Spacer,
    HStack
} from '@chakra-ui/react'
import { useProvider } from '../../context';


export const AlertDonate = () => {
    const { donateIsOpen, donateOnOpen, donateOnClose, donateCancelRef } = useProvider();
    return(
        <AlertDialog
            isOpen={donateIsOpen}
            leastDestructiveRef={donateCancelRef}
            onClose={donateOnClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>Donar USDC</AlertDialogHeader>
                    <AlertDialogBody>
                        <VStack>
                            <Text>HOLA</Text>
                        </VStack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <HStack w='full'>
                            <Spacer/>
                            <Button onClick={donateOnClose} bg='red'>
                                Cancelar
                            </Button>
                            <Box w='5px' />
                            <Button onClick={donateOnClose} bg='green.500'>
                                Donar
                            </Button>
                        </HStack>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};