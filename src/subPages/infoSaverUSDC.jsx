import { VStack, HStack, Box, Spacer, Spinner, Text, Link, Button } from '@chakra-ui/react';
import { InfoCard } from '../components/infoCard';
import React from 'react';
import { useProvider } from '../context';
import { MAIN_CURRENCY } from '../web3/funcs';


export const InfoSaverUSDC = () => {

    const { saverPrice, saverMinted } = useProvider();

    const price = {
        title: `ABLE / ${MAIN_CURRENCY}`,
        amount: saverPrice
    };

    const minted = {
        title: 'ABLE Distribuido',
        amount: saverMinted
    };

    return (
        <>
            {/* Mobile */}

            <VStack w='full' display={{lg: "none", md: "none", sm: "flex", base: "flex"}}>
                <HStack w='full'>
                    <Spacer />
                    <InfoCard props={price}/>
                    <Spacer />
                </HStack>

                <Box h='10px' />

                <HStack w='full'>
                    <Box w='10px' />
                    <Link isExternal href='https://pancakeswap.finance/' w='full'>
                        <Button w='full' variant='actionDapp'>Pool de Liquidez</Button>
                    </Link>
                    <Box w='10px' />
                </HStack>

                <HStack w='full'>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'Él método de introducción al mercado que hemos elegido para SAVER, es ir añadiendo de manera gradual ciertas cantidades a una Pool de Liquidez en PancakeSwap.'}
                    </Text>
                    <Spacer />
                </HStack>

                <Box h='30px' />

                <HStack w='full'>
                    <Spacer />
                    <InfoCard props={minted}/>
                    <Spacer />
                </HStack>
                <HStack w='full'>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'Cuando los holders culminen un periodo de 30 dias jugando seguidos y terminen ese periodo con un Balance de Donaciones igual o superior a 369 USDC seran premiados con nuevos SAVER. Esta recompenza sera de 369 SAVER y la podran reclamar los holders calificados hasta que se terminen de mintear la cantidad total de SAVER'}
                    </Text>
                    <Spacer />
                </HStack>

                <Box h='30px' />
                
            </VStack>

            {/* Desktop */}
            <VStack w="full" display={{lg: "flex", md: "flex", sm: "none", base: "none"}}>

                <HStack w='full'>
                    <Box w='10px' />
                    <VStack w='full'>
                        <HStack w='full'>
                            <Spacer />
                            <Text align='justify' w='full'>
                                {'Él método de introducción al mercado que hemos elegido para SAVER, es ir añadiendo de manera gradual ciertas cantidades a una Pool de Liquidez en PancakeSwap.'}
                            </Text>
                            <Spacer />
                        </HStack>
                        <Box h='10px' />
                        <HStack w='full'>
                            <Spacer />
                            <Link isExternal href='https://pancakeswap.finance/'>
                                <Button variant='actionDapp' w='300px'>Pool de Liquidez</Button>
                            </Link>
                            <Spacer />
                        </HStack>
                    </VStack>
                    <Spacer />
                    <InfoCard props={price}/>
                    <Box w='10px' />  
                </HStack>

                <Box h='30px' />

                <HStack>
                    <Box h='10px' /> 
                    <InfoCard props={minted}/>
                    <Spacer />
                    <Text align='justify' w='full'>
                        {'Cuando los holders culminen un periodo de 30 dias jugando seguidos y terminen ese periodo con un Balance de Donaciones igual o superior a 369 USDC seran premiados con nuevos SAVER. Esta recompenza sera de 369 SAVER y la podran reclamar los holders calificados hasta que se terminen de mintear la cantidad total de SAVER'}
                    </Text>
                    <Box h='10px' />
                </HStack>

                <Box h='30px' />

            </VStack>

        </>
    );
};