import React from "react";
import { VStack, HStack, Spacer, Box, Text, Heading, Button, useColorModeValue, Link } from "@chakra-ui/react";
import { useProvider } from "../../context";
import { MAIN_CURRENCY } from "../../web3/funcs";

/*
    props: {
        title: string,
        amountRaised: string,
        amountToClaim: string,
        actualAmount: string

    }
*/


export const CardDapp = (props) => {

    return(
        <>
            <Desktop {...props} />
            <Mobile {...props} />
        </>
    );
};

const Mobile = (props) => {
    const { alreadyClaim } = useProvider();

    const colorFont = useColorModeValue('bgLight', 'bgDark');
    const colorCard = useColorModeValue('blue.300', 'blue.400');

    return (
        <VStack w='full' h='250px' bg={colorCard} borderRadius={6} boxShadow={3} display={{xl:'none', lg: 'flex', md: 'flex', sm: 'flex', base: 'flex'}}>
            <Box h='10px' />
            <HStack w='full'>
                <Spacer />
                <Heading color={colorFont} fontSize='45px'>{props.title}</Heading>
                <Spacer />
            </HStack>
            <Spacer />
            <HStack w='full'>
                <Spacer />
                <Heading fontSize='40px' color={colorFont}>{props.amountRaised}</Heading>
                <Spacer />
            </HStack>
            <Spacer />

            {
                props.actualAmount != props.amountRaised ?
                <HStack w='full'>
                    <Box w='10px' />
                    <VStack h='full'>
                        <Spacer />
                        <Text color={colorFont}>Pendiente</Text>
                        <Spacer />
                    </VStack>
                    <Spacer />
                    
                        <VStack h='full'>
                            <Spacer />
                            <Text color={colorFont}>{ props.actualAmount }</Text>
                            <Spacer />
                        </VStack> 
        
                    <Box w='10px' />
                </HStack> : null
            }

            <HStack w='full'>
                <Box w='10px' />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorFont}>A Recibir</Text>
                    <Spacer />
                </VStack>
                <Spacer />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorFont}>{
                     props.actualAmount == props.amountRaised ? 
                        props.amountToClaim :
                        alreadyClaim ? 0 : props.amountToClaim
                     }</Text>
                    <Spacer />
                </VStack> 
                <Box w='10px' />
            </HStack>
            <Box h='10px' />
        </VStack>
    );
};

const Desktop = (props) => {
    
    const { alreadyClaim } = useProvider();

    const colorFont = useColorModeValue('bgLight', 'bgDark');
    const colorCard = useColorModeValue('blue.300', 'blue.400');

    return(
        <VStack w='450px' h='250px' bg={colorCard} borderRadius={6} boxShadow={3} display={{xl: 'flex', lg: 'none', md: 'none', sm: 'none', base: 'none'}}>
            <Box h='10px' />
            <HStack w='full'>
                <Spacer />
                <Heading fontSize='55px' color={colorFont}>{props.title}</Heading>
                <Spacer />
            </HStack>
            <Spacer />
            <HStack w='full'>
                <Spacer />
                <Heading fontSize='45px' color={colorFont}>{props.amountRaised}</Heading>
                <Spacer />
            </HStack>
            <Spacer />
            {
                props.amountRaised != props.actualAmount ? 
                <HStack w='full'>
                    <Box w='10px' />
                    <VStack h='full'>
                        <Spacer />
                        <Text color={colorFont}>Pendiente</Text>
                        <Spacer />
                    </VStack>
                    <Spacer />
                    <VStack h='full'>
                        <Spacer />
                        <Text color={colorFont}>{ props.actualAmount }</Text>
                        <Spacer />
                    </VStack>
                    <Box w='10px' />
                </HStack>
                : <HStack w='full'>
                <Box w='10px' />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorCard}>Pendiente</Text>
                    <Spacer />
                </VStack>
                <Spacer />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorCard}>{ props.actualAmount == `0.00 ${MAIN_CURRENCY}` ? props.amountRaised : props.actualAmount }</Text>
                    <Spacer />
                </VStack>
                <Box w='10px' />
            </HStack>
            }
            <HStack w='full'>
                <Box w='10px' />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorFont}>A Recibir</Text>
                    <Spacer />
                </VStack>
                <Spacer />
                <VStack h='full'>
                    <Spacer />
                    <Text color={colorFont}>{
                        props.actualAmount == props.amountRaised ? 
                        props.amountToClaim :
                        alreadyClaim ? `0  ${MAIN_CURRENCY}` : props.amountToClaim
                    }</Text>
                    <Spacer />
                </VStack>
                <Box w='10px' />
            </HStack>
            
            <Box h='10px' />
        </VStack>
    );
};