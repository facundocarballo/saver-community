import React from "react";
import { VStack, HStack, Text, Spacer, Box } from '@chakra-ui/react';
import { useProvider } from '../../context';
import { MAIN_CURRENCY } from "../../web3/funcs";

export const Formula = () => {
    const { Able } = useProvider();

    const color = 'white';

    return(
        <>
        {/* Desktop */}
        <HStack w='full' display={{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}} bg='blue.300' paddingBottom={6} paddingTop={6}>
            <Box w='10px' />

            <VStack>
                <Text fontWeight='bold' color={color}>Cantidad a Recibir</Text>
                <HStack h='50px'>
                    <Box w='10px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '10px', base: '10px'}}
                    >{Number(Able.reward.stableCoin.actual.toClaim).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='10px' />
                </HStack>
                <Spacer />
            </VStack>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
            color={color}>{'='}</Text>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
            color={color}>{`(`}</Text>

            <Spacer />

            <VStack>
                <Text fontWeight='bold' color={color}>Tu BDD</Text>
                <HStack h='50px'>
                    <Box w='10px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '10px', base: '10px'}}
                    >{Number(Able.donationBalance).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='10px' />
                </HStack>
                <Spacer />
            </VStack>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}}
            color={color}
            >{`*`}</Text>

            <Spacer />

            <VStack>
                <Text fontWeight='bold' color={color}>Repartiendo</Text>
                <HStack h='50px'>
                    <Box w='10px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '10px', base: '10px'}}
                    >{Number(Able.reward.stableCoin.actual.raised).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='10px' />
                </HStack>
                <Spacer />
            </VStack>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
            color={color}
            >{`)`}</Text>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
            color={color}
            >{`/`}</Text>

            <Spacer />

            <VStack>
                <Text fontWeight='bold' color={color} >BDD de las Cuentas Calificadas</Text>
                <HStack h='50px'>
                    <Box w='5px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '10px', base: '10px'}}
                    >{Number(Able.bddQualified).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='5px' />
                </HStack>
                <Spacer />
            </VStack>

            <Box w='10px' />

        </HStack>

        {/* Mobile */}

        <HStack display={{lg: 'none', md:'none', sm: 'flex', base: 'flex'}} w='full' bg='blue.300' paddingBottom={6} paddingTop={6}>
            <Spacer />
            <VStack h='full'>
                <Spacer />
                <Text fontWeight='bold' color={color} fontSize='10px'>Cantidad a Recibir</Text>
                <HStack h='40px'>
                    <Box w='5px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '12px', base: '12px'}}
                    >{Number(Able.reward.stableCoin.actual.toClaim).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='5px' />
                </HStack>
                <Spacer />
            </VStack>

            <Spacer />

            <Text 
            fontWeight='black' 
            fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
            color={color}
            >{'='}</Text>

            <Spacer />

            <VStack h='full'>

                <HStack w='full'>

                    <Spacer />

                    <VStack>
                        <Text fontWeight='bold' color={color} fontSize='10px'>Tu BDD</Text>
                        <HStack h='40px'>
                            <Box w='5px' />
                            <Text 
                            fontWeight='bold' 
                            color={color} 
                            fontSize={{lg: '15px', md: '15px', sm: '12px', base: '12px'}}
                            >{Number(Able.donationBalance).toFixed(2)} {MAIN_CURRENCY}</Text>
                            <Box w='5px' />
                        </HStack>
                    </VStack>

                    <Text 
                    fontWeight='black' 
                    fontSize={{lg: '35px', md: '35px', sm: '20px', base: '20px'}} 
                    color={color}>{`*`}
                    </Text>

                    <VStack>
                        <Text fontWeight='bold' color={color} fontSize='10px'>Repartiendo</Text>
                        <HStack h='40px'>
                            <Box w='5px' />
                            <Text 
                            fontWeight='bold' 
                            color={color} 
                            fontSize={{lg: '15px', md: '15px', sm: '12px', base: '12px'}}
                            >{Number(Able.reward.stableCoin.actual.raised).toFixed(2)} {MAIN_CURRENCY}</Text>
                            <Box w='5px' />
                        </HStack>
                    </VStack>
                   

                    <Spacer />

                </HStack>

                <Spacer />
                
                <Box w='full' h='1px' border='1px solid' color={color} />
                
                <HStack h='40px'>
                    <Box w='5px' />
                    <Text 
                    fontWeight='bold' 
                    color={color} 
                    fontSize={{lg: '15px', md: '15px', sm: '12px', base: '12px'}}
                    >{Number(Able.bddQualified).toFixed(2)} {MAIN_CURRENCY}</Text>
                    <Box w='5px' />
                </HStack>
                <Text fontWeight='bold' color={color} fontSize='10px' >BDD de las Cuentas Calificadas</Text>

            </VStack>
            
            <Spacer />
        </HStack>

        </>
        
    );

};