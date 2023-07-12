import { VStack, HStack, Spacer, Text, Image, Box, useDisclosure, Button, Spinner } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'
import React from "react";
import { useProvider } from "../../context";
import { loadDappData, GAS_PRICE } from "../../web3/funcs";
import { MAIN_CURRENCY, SAVER_TOKEN_CONTRACT_ADDRESS } from "../../web3/funcs";



export const Timer = () => {

    const { 
        Able,
        canClaim,
        handleWeb3   
    } = useProvider();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showSpinner, setShowSpinner] = React.useState(false);
    const [updating, setUpdating] = React.useState(false);
    const cancelRef = React.useRef()
     
    return(
        <>
        {/* Alert Dialog Update */}
        <AlertDialog
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {'El Botón de actualizar tiene un costo de gas. Recomendamos usarlo sólo cuando los otros medios de recargar no funcionen para la actualización de los botes.'}
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button variant='info' onClick={handleWeb3} isDisabled={updating}>
                    Actualizar
                    </Button>
                    <Box w='10px' />
                    {
                        showSpinner ? 
                        <HStack>
                            <Spinner /> 
                            <Box w='10px' />
                        </HStack>
                        : null
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


        <VStack>
            <HStack display={{lg: 'flex', md: 'flex', sm: 'flex', base: 'flex'}} w='full'>
                <Spacer />

                <VStack>
                    <Text color='pink.300' fontSize='lg' fontWeight='bold' >{ Able.timer == '00:00' ? 'Actualiza Ahora' : 'Hasta el siguiente bote' }</Text>
                    <HStack w='200px' h='80px' border='1px' borderColor='pink.300' borderRadius={6} shadow={6}>
                        <Spacer />
                        <Text color='pink.300' fontSize='45px' fontWeight='bold'>{Able.timer}</Text>
                        <Spacer />
                    </HStack>
                </VStack>

                <Spacer />

                <VStack>
                    <Box h='25px' />
                    <HStack w='80px' h='80px' border='1px' borderColor='pink.300' borderRadius={6} shadow={6} onClick={onOpen} cursor='pointer'>
                        <Spacer />
                        <Image
                        src='https://i.ibb.co/QvXSbLc/refresh-pink.png'
                        alt='refresh'
                        boxSize='50px'
                        />
                        <Spacer />
                    </HStack>
                </VStack>

                <Spacer />
            </HStack>
            
            <Box h={{xl: '110px', lg:'0px', md:'0px', sm: '0px', base: '0px'}}/>
            <Text
            color='pink.400' fontSize='md' fontWeight='bold'
            >{canClaim() ? 'Cuenta Calificada' : 'Cuenta No Calificada'}</Text>
        </VStack>
        </>
    );
};