import { VStack, HStack, Text, Heading, Box, Spacer, Spinner, Button, Input } from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import React from "react";
import Head from "next/head";
import { IMG_ABLE_SAVER_LOGO } from "../src/images";

const Calculadora = () => 
{
    const [usdcAmount, setUsdcAmount] = React.useState('');
    const [daiAmount, setDaiAmount] = React.useState('');
    const [interestRate, setInterestRate] = React.useState('');
    const [days, setDays] = React.useState('');
    const [showTable, setShowTable] = React.useState(false);

    // Functions
    const getAmounts = () => 
    {
        // devuelve un array de mapas estilo {usdc: value, dai: value}
        let vec = [];
        let usdc = Number(usdcAmount);
        let dai = Number(daiAmount);
        const percent = interestRate / 100;

        for (var i = 0; i < days; i++)
        {
            usdc *= (1 + percent);
            dai *= (1 + percent);

            const obj = {
                usdc: usdc.toFixed(2),
                dai: dai.toFixed(2),
                totalSavings: (usdc + dai).toFixed(2),
                day: i
            };

            vec.push(obj);
        }

        return vec;
    }

    return (
        <>



            <Head>
                <title>Able Saver - Calculadora</title>
                <meta name="description" content="Calculadora oficial de Able Saver." />
                <meta name="image" content={IMG_ABLE_SAVER_LOGO} />
            </Head>

            <VStack w='full'>

                <Heading>Calculadora Saver Able</Heading>

                <VStack w='full'>
                    <HStack w='full'>
                        <VStack w='full'>
                            <HStack w='full'>
                                <Box w='30px' />
                                <Input
                                value={usdcAmount}
                                onChange={(e) => setUsdcAmount(e.target.value)}
                                placeholder="Ingrese la cantidad inicial de USDC"
                                w='100px'
                                />
                                <Text>USDC</Text>
                                <Box w='30px' />
                            </HStack>

                            <HStack w='full'>
                                <Box w='30px' />
                                
                                <Input
                                value={daiAmount}
                                onChange={(e) => setDaiAmount(e.target.value)}
                                placeholder="Ingrese la cantidad inicial de DAI"
                                w='100px'
                                />
                                <Text>DAI</Text>
                                <Box w='30px' />
                            </HStack>

                            <HStack w='full'>
                                <Box w='30px' />
                                
                                <Input
                                value={days}
                                onChange={(e) => setDays(e.target.value)}
                                placeholder="Ingrese la cantidad de dias"
                                w='100px'
                                />
                                <Text>Dias</Text>
                                <Box w='30px' />
                            </HStack>

                            <HStack w='full'>
                                <Box w='30px' />
                                
                                <Input
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                placeholder="Ingrese el % que desea utilizar (solo en numeros)"
                                w='100px'
                                />
                                <Text>% Establecido</Text>
                                <Box w='30px' />
                            </HStack>
                        </VStack>

                        {
                            usdcAmount != '' && daiAmount != '' && days != '' && interestRate != '' ?
                            <VStack w='full'>
                                
                                <Text fontWeight='bold'>Al termino de {days} dias debera tener:</Text>

                                <HStack w='full'>
                                    <Text align='justify'>{getAmounts()[days-1].usdc} USDC</Text>
                                    <Spacer />
                                </HStack>

                                <HStack w='full'>
                                    <Text align='justify'>{getAmounts()[days-1].dai} DAI</Text>
                                    <Spacer />
                                </HStack>

                                <HStack w='full'>
                                    <Text align='justify'>{getAmounts()[days-1].totalSavings} Total Ahorrados</Text>
                                    <Spacer />
                                </HStack>
                                
                            </VStack> : null
                        }
                        
                    </HStack>
                </VStack>

                {
                    interestRate != '' && days != '' && daiAmount != '' && usdcAmount != '' ?
                    <Button onClick={() => setShowTable(true)}>Mostrar Resultados</Button> : null
                }


            {
                showTable && days != '' && interestRate != '' && usdcAmount != ''  && daiAmount != '' ? 
                <TableContainer w='full'>
                    <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>{'Dia Numero'}</Th>
                            <Th>{'USDC'}</Th>
                            <Th>{'DAI'}</Th>
                            <Th>{'Ahorros Totales'}</Th>
                        </Tr>
                    </Thead>
                    {
                        getAmounts().map((amount, idx) => 
                        <Thead key={idx}>
                            <Tr>
                                <Th>{amount.day}</Th>
                                <Th>{amount.usdc}</Th>
                                <Th>{amount.dai}</Th>
                                <Th>{amount.totalSavings}</Th>
                            </Tr>
                        </Thead>
                        )
                    }
                    </Table>
                </TableContainer>
                : null
            }

            </VStack>
        </>
    );
}

export default Calculadora;